import json
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from godot_video_converter import convertFile  # pyright: ignore[reportImplicitRelativeImport]
origins = [
    "*"
]

INPUT_DIR = Path("input")
OUTPUT_DIR = Path("output")

class VideoData(BaseModel):
    format: str

class GeneralResponse(BaseModel):
    success: bool
    message: str
class UploadData(BaseModel):
    filename: str | None
    size: int | None

class UploadResponse(BaseModel):
    success: bool
    message: str
    data: UploadData | None = None

class DownloadData(BaseModel):
    filename: str | None
    size: int | None

class DownloadResponse(BaseModel):
    success: bool
    message: str
    data: DownloadData | None

class ConvertRequest(BaseModel):
    filename: str

def is_video_valid(file):
    if file.size == 0:
        raise HTTPException(400, "Empty file")
    if file.content_type not in video_formats:
        raise HTTPException(400, "Format not supported")
    if file is None:
        raise HTTPException(400, "No file added")


async def upload_video(file):
    file_name = Path(f"{file.filename}")
    if not Path('input').exists():
        Path('input').mkdir()
    file_path = Path(f"./input/{file_name}")
    video_bytes = await file.read()  # Read received file bytes
    file_path.write_bytes(video_bytes)

async def generate_uuid(video_name):
    # Check if metadata.json file exists
    metadata_path = Path('./input/metadata.json')
    if not metadata_path.exists():
        metadata_path.touch(exist_ok=True) # Creates the metadata file, if already exists is success anyway.
        metadata_path.write_text("[]");
    x_uuid = uuid4() # create random uuid for the video
    uuid = str(x_uuid) # Convert uuid to string. IF NOT JSON BREAKS
    video_json = {
        "uuid": uuid,
        "name": video_name
    }
    data_json = metadata_path.read_text()
    data_py = json.loads(data_json) # json loads converts from json format to python object
    data_py.append(video_json)
    new_data_json = json.dumps(data_py) # json dumps converts python object to json format
    metadata_path.write_text(new_data_json)

async def get_uuid(video_name):
    metadata_path = Path('./input/metadata.json')
    if not metadata_path.exists():
        return "ERROR: metadata file does not exists"
    data = json.loads(metadata_path.read_text())
    for video in data: # -> video is a dict
        print(video)
        print(video["name"])
        if video["name"] == video_name:
            print("video uuid is: ", video["uuid"])
            return video["uuid"]
    print("error video not found")
    return "ERROR: video not found"


def delete_video(file):
    file.unlink()


app = FastAPI()
video_formats = ["video/mp4", "video/mkv", "video/mov", "video/gif, video/avi"]
suffix_formats = [".mp4", ".mkv", ".mov", ".gif", ".avi"]
options = {"video_quality": 5, "audio_quality": 5}

# Add Cors Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_headers=["*"],
    allow_methods=["*"]
)

@app.get("/health")
def read_root():
    return {"status": "healthy"}


@app.post("/upload", response_model=UploadResponse, )
async def upload_controller(file: UploadFile):
    print("Upload petition received")
    is_video_valid(file)
    await upload_video(file)
    await generate_uuid(file.filename)
    return UploadResponse(
        success= True,
        message= "Videos uploaded succesfully",
    )
app.get('/videos/{video_name}')
async def return_uuid(video_name):
    uuid = get_uuid(video_name)
    if uuid != None:
        return {"data": uuid}
    return GeneralResponse(
        success = False,
        message = "ERROR: Video name not found. Could not retrieve UUID "
    )
@app.get('/videos')
async def get_videos():
    video_list = []
    if not Path('./input').exists():
        return GeneralResponse(
            success=False,
            message="Error: Input folder is empty or does not exist")
    input_folder = Path('./input')
    for x in input_folder.iterdir():
        if x.is_file() and suffix_formats.count(x.suffix) > 0:
            uuid = await get_uuid(x.name)
            videoObject = {
                "filename": x.name,
                "format": x.suffix,
                "uuid": uuid
            }
            video_list.append(videoObject)
    return {
        "videos": video_list
    }
@app.get('/output')
async def get_output():
    videoList = []
    input_folder = Path('./output')
    for x in input_folder.iterdir():
        if x.is_file():
            videoObject = {
                "filename": x.name,
                "format": x.suffix
            }
            videoList.append(videoObject)
    return {
        "videos": videoList
    }
@app.get("/download/{filename}")
async def download_video(filename: str):
    file_path = OUTPUT_DIR / filename
    if not file_path.exists():
        raise HTTPException(400, "File does not exist")
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="video/ogg"
    )
@app.post("/convert_file/{filename}")
async def convert_file(filename: str,data: VideoData):
    file_path_obj = Path(filename)
    file_path = Path(f"./input/{filename}")
    if not Path('output').exists():
        Path('output').mkdir()
    output_path = Path(f"output/{file_path_obj.stem}.{data.format}")
    print(output_path)
    convertFile(file_path, options, output_path)
    output_file = output_path.read_bytes()
    if output_file == 0:
        raise HTTPException(500, "Converted file is empty")
    return GeneralResponse(
        success = True,
        message = "Succesfully converted video")

@app.post("/convert")
async def convert_video(file: UploadFile):
    is_video_valid(file)
    file_name = Path(f"{file.filename}")
    file_path = Path(f"./input/{file_name}")
    video_bytes = await file.read()  # Read received file bytes
    # Write bytes into previously created file in input folder
    file_path.write_bytes(video_bytes)
    if not Path('output').exists():
            Path('output').mkdir()
    output_path = Path(f"output/{file_name.stem}.ogv")
    convertFile(file_path, options, output_path)
    # Check if output file exists
    output_file = output_path.read_bytes()
    if output_file == 0:
        raise HTTPException(500, "Converted file is empty")
    return GeneralResponse(
        success = True,
        message = "Succesfully converted video")

from pathlib import Path
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi import FastAPI,  HTTPException, UploadFile
from godot_video_converter import convertFile
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "*"
]

INPUT_DIR = Path("input")
OUTPUT_DIR = Path("output")

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


def delete_video(file):
    file.unlink()


app = FastAPI()
video_formats = ["video/mp4", "video/mkv", "video/mov", "video/gif, video/avi"]
options = {"video_quality": 5, "audio_quality": 5}

# Add Cors Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_headers=[""]
)

@app.get("/health")
def read_root():
    return {"status": "healthy"}


@app.post("/upload", response_model=UploadResponse, )
async def upload_controller(file: UploadFile):
    is_video_valid(file)
    await upload_video(file)
    return UploadResponse(
        success= True,
        message= "Videos uploaded succesfully",
    )
@app.get('/videos')
async def get_videos():
    videoList = []
    input_folder = Path('./input')
    for x in input_folder.iterdir():
        if x.is_file():
            videoList.append(x)
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
@app.post("/convert_file")
async def convert_file(request: ConvertRequest):
    file_path_obj = Path(request.filename)
    file_path = Path(f"./input/{file_path_obj}")
    if not Path('output').exists():
        Path('output').mkdir()
    output_path = Path(f"output/{file_path_obj.stem}.ogv")
    convertFile(file_path, options, output_path)
    output_file = output_path.read_bytes()
    if output_file == 0:
        raise HTTPException(500, "Converted file is empty")
    return {"message: Succesfully converted the video"}

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
    return {"message": "Succesfully converted the video"}

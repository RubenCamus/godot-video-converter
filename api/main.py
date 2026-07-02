from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from godot_video_converter import convertFile


def is_video_valid(file):
    if file.size == 0:
        raise HTTPException(400, "Empty file")
    if file.content_type not in video_formats:
        raise HTTPException(400, "Format not supported")
    if file is None:
        raise HTTPException(400, "No file added")


async def upload_video(file):
    file_name = Path(f"{file.filename}")
    file_path = Path(f"./input/{file_name}")
    video_bytes = await file.read()  # Read received file bytes
    file_path.write_bytes(video_bytes)


def delete_video(file):
    file.unlink()


app = FastAPI()
video_formats = ["video/mp4", "video/mkv", "video/mov", "video/gif, video/avi"]
options = {"video_quality": 5, "audio_quality": 5}


@app.get("/")
def read_root():
    return {"Message": "Thing works"}


@app.post("/upload")
async def upload_controller(file: UploadFile):
    is_video_valid(file)
    await upload_video(file)


@app.post("/convert")
async def convert_video(file: UploadFile):
    is_video_valid(file)
    file_name = Path(f"{file.filename}")
    file_path = Path(f"./input/{file_name}")
    video_bytes = await file.read()  # Read received file bytes
    # Write bytes into previously created file in input folder
    file_path.write_bytes(video_bytes)
    output_path = Path(f"output/{file_name.stem}.ogv")
    convertFile(file_path, options, output_path)
    # Check if output file exists
    output_file = output_path.read_bytes()
    if output_file == 0:
        raise HTTPException(500, "Converted file is empty")
    return {"Message": "Succesfully converted the video"}

from http import HTTPStatus
from pathlib import Path
from pydantic import BaseModel
from typing import Any, Optional
from fastapi import FastAPI, File, HTTPException, UploadFile
from godot_video_converter import convertFile

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


@app.get("/health")
def read_root():
    return {"status": "healthy"}


@app.post("/upload", status_code=201, response_model=UploadResponse)
async def upload_controller(file: UploadFile):
    is_video_valid(file)
    await upload_video(file)
    return UploadResponse(
        success= True,
        message= "Video uploaded succesfully",
        data= UploadData(
            filename= file.filename,
            size= file.size,
        )
    )
@app.get("/download")
async def download_video():
    return DownloadResponse(
        success = True,
        message = "Video downloaded succesfully",
        data = DownloadData(
            filename = "FileName",
            size = 0
        )
    )
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

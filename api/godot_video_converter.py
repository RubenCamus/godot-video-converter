import os
import subprocess
from os import listdir
from os.path import isfile, join


def input_file_name():
    print(
        "Input the exact name of the file to convert, extension included. Ex: video_to_convert.mp4: "
    )
    fileName = input()
    options = chooseOptions()
    return fileName, options


def chooseOptions():
    options = {
        "video_quality": 5,
        "audio_quality": 5,
    }
    options["video_quality"] = int(
        input(
            "Choose the video quality from 1-10, 10 being the highest possible, be careful with high quality formats like 4K and long videos. "
            "If you don't choose a number, default is 5: "
        )
    )
    if options["video_quality"] <= 10 or options["video_quality"] >= 1:
        print("Selected video quality is ", options["video_quality"])
    else:
        print("Not supported video quality, assuming default 5.")
        options["video_quality"] = 5
    options["audio_quality"] = int(
        input(
            "Choose the audio quality from 1-10, 10 being the highest possible. "
            "If you don't choose a number, default is 5: "
        )
    )
    if options["audio_quality"] <= 10 or options["audio_quality"] >= 1:
        print("Selected video quality is ", options["video_quality"])
    else:
        print("Not supported video quality, assuming default 5.")
        options["video_quality"] = 5
    return options


def get_video_files():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    video_files = []
    onlyfiles = [f for f in listdir(dir_path) if isfile(join(dir_path, f))]
    for file in onlyfiles:
        filename, file_extension = os.path.splitext(file)
        print(filename, file_extension)
        if (
            file_extension == ".mp4"
            or file_extension == ".mov"
            or file_extension == ".gif"
        ):
            video_files.append(file)
            print("file extension is: ", file_extension, "appending")
        else:
            print("Not accepted video file format")
    print(video_files)
    return video_files


# Process the file with the godot's docs ffmpeg command
def convertFile(video_file, options, output_path):
    command = f"ffmpeg -i {video_file} -c:v libtheora -q:v {options['video_quality']} -q:a {options['audio_quality']} -g:v 36 {video_file}_theora.ogv"
    output_video = subprocess.run(
        f"ffmpeg -i {video_file} -c:v libtheora -q:v {options['video_quality']} -q:a {options['audio_quality']} -g:v 36 {output_path}"
    )
    print("File converted")
    return output_video

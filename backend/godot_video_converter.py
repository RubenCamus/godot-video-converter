import os
import subprocess
from os import listdir
from os.path import isfile, join

# Process the file with the godot's docs ffmpeg command
def convertFile(video_file, options, output_path):
    output_video = subprocess.run(
        f"ffmpeg -i {video_file} -q:v {options['video_quality']} -q:a {options['audio_quality']} -g:v 36 {output_path}"
    )
    print("File converted")
    return output_video

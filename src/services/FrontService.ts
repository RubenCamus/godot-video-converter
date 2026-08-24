import { VideoData } from "../types/video";

const backendURL = "http://127.0.0.1:8000"; // !TODO change for config file linked to backend URL
export async function convertVideo(format: string, onConvert: () => void, selectedVideos: Array<string>) {
  // Gets format from App's Select component.
  // onConvert is a callback function for updating UI when finishes converting the video.
  // selectedVideos is the array of selectedVideos in App
  selectedVideos.forEach(async (video) => {
    await fetch(`${backendURL}/convert_file/${video}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ format: format }),
    })
    onConvert();
  })
  // TODO ADD TEST IF VIDEOS WERE CONVERTED THEN CALLBACK FUNCTION
}
export async function downloadVideo(video_name: string) {
  const response = await fetch(`${backendURL}/download/${video_name}`); // Returns a file
  const video = response.blob();
  return video;
}
export async function getVideos() {
  const videos = await fetch(`${backendURL}/videos`); // Returns {videos} containing an array of videos in  objects from input folder.
  const response = await videos.json();
  if (response == null || response == "") {
    return "Error: No videos found on fetch."
  }
  return response;
}
export async function getOutputVideos() {
  const videos = await fetch(`${backendURL}/output`); // Returns {videos} containing an array of videos in  objects from input folder.
  const response = await videos.json();
  if (response == null || response == ""){return "Error: No output videos found on fetch"}
  return response;
}

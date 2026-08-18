import { VideoData } from "../types/video";

const backendURL = "http://127.0.0.1:8000"; // !TODO change for config file linked to backend URL

export async function convertVideo(format: string, onConvert: () => void,selectedVideos: Array<string>) {
  selectedVideos.forEach(async (video) => {
    await fetch(`${backendURL}/convert_file/${video}`, {
      method: "POST",
    })
  })
  // TODO ADD TEST IF VIDEOS WERE CONVERTED THEN CALLBACK FUNCTION
    onConvert();
}
export async function downloadVideo(video_name: string) {
  const response = await fetch(`${backendURL}/download/${video_name}`); // Returns a file
  const video = response.blob();
  return video;
}
export async function getVideos() {
  const videos = await fetch(`${backendURL}/videos`); // Returns {videos} containing an array of videos in  objects from input folder.
  const response = await videos.json();
  return response;
}
export async function getOutputVideos() {
  const videos = await fetch(`${backendURL}/output`); // Returns {videos} containing an array of videos in  objects from input folder.
  const response = await videos.json();
  return response;
}

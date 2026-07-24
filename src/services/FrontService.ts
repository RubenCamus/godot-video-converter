const backendURL = "http://127.0.0.1:8000";

export async function convertVideo() {
  const videosArray = await getVideos();
  console.log(videosArray);
  for (let i = 0; i < videosArray.videos.length; i++) {
    fetch(`${backendURL}/convert_file/${videosArray.videos[i].filename}`, {
      method: "POST",
    });
  }
}
export async function downloadVideo(video_name: string) {
  video_name = "VideoWordle.ogv";
  const response = await fetch(`${backendURL}/download/${video_name}`);
  const video = response.blob();
  return video;
}
export async function getVideos() {
  const videos = await fetch(`${backendURL}/videos`);
  const response = await videos.json();
  return response;
}

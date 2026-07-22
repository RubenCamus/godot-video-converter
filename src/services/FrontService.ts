const backendURL = "http://127.0.0.1:8000";

export async function convertVideo() {
  return 0
}

export async function getVideos() {
  const videos = await fetch(`${backendURL}/videos`);
  console.log("videos ", await videos.json());
  return videos;
}

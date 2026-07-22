const backendURL = "127.0.0.1:8000";

async function convertVideo() {
  return 0
}

async function getVideos() {
  const videos = await fetch(`${backendURL}/videos`);
  return videos;
}

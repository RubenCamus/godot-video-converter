const backendURL = "http://127.0.0.1:8000";

export async function convertVideo() {
  const videosArray = await getVideos();
  for (let i = 0; i < videosArray.length; i++) {
    fetch(`${backendURL}/convert_file`, {
      method: "POST",
      body: videosArray[i]
    });
  }
}

export async function getVideos() {
  const videos = await fetch(`${backendURL}/videos`);
  const response = await videos.json();
  return response;
}

const fileElement = document.getElementById("input-files");
const convertButton = document.getElementById("convert-button");
const uploadButton = document.getElementById("upload-button");
const form = document.querySelector("#video-form");
convertButton.addEventListener("click", (e) => {
  // Get uploaded video files
  const fileList = fileElement.files;
  // Store video files to backend

  // Show loading screen while waiting
  // OnFinish
});
uploadButton.addEventListener("click", async () => {
  const fileList = fileElement.files;
  const formData = new FormData(form);
  try {
    postAPI("http://127.0.0.1/upload", formData);
  } catch (e) {
    alert(e);
  }
});

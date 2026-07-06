const fileElement = document.getElementById("input-files");
const convertButton = document.getElementById("convert-button");
const uploadButton = document.getElementById("upload-button");
convertButton.addEventListener("click", (e) => {
  // Get uploaded video files
  const fileList = fileElement.files;
  // Store video files to backend

  // Show loading screen while waiting
  // OnFinish
});
uploadButton.addEventListener("click", async () => {
  const fileList = fileElement.files;
  const formData = new FormData();
  formData.append("file", fileList[0]);
  try {
    console.log("formData is: ", formData);
    uploadAPI("http://127.0.0.1:8000/upload", formData);
  } catch (e) {
    console.log(e);
  }
});
async function uploadAPI(url, formData) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response;
}

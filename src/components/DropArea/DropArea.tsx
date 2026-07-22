import MainButton from "../MainButton/MainButton"
import styles from './DropArea.module.css';


export default function DropArea() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <img id={styles.cloudIcon} src="cloud-upload.svg" alt="cloud upload" />
        <span>Drag your videos here</span>
        <span>or select from your device</span>
        <input id="input-files" type="file" accept="video/*" multiple />
        {/*<MainButton content={"Select your files here"}/>*/}
        <span id={styles.formatsText}>{"Accepted file formats - " + "maxFileSize"}</span>
        <MainButton  content="Upload videos" onClick={uploadVideos}></MainButton>
      </div>
    </div>
  )
}

async function uploadVideos() {
  const fileElement = document.getElementById('input-files') as HTMLInputElement;
  console.log("Upload Video");
  const fileList = fileElement.files;
  console.log("filelist is: ", fileList);
  const formData = new FormData();
  formData.append("file", fileList[0]);
  console.log("file is : ", fileList[0]);
  try {
    await uploadAPI("http://127.0.0.1:8000/upload", formData);
  } catch (e) {
      console.log(e);
  }
}
async function uploadAPI(url: string, formData: FormData) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response;
}

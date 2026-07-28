import { useState } from "react";
import MainButton from "../MainButton/MainButton"
import styles from './DropArea.module.css';

var fileList: File[] = [];

export default function DropArea() {
  const [isDragging, setIsDragging] = useState(false);
  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
    if (isDragging) {

    }
  }
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (!event.dataTransfer.types.includes("Files")) { return "Not a valid file"; }
    const files = event.dataTransfer.files;
    handleFiles(Array.from(files));
  }
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;

    console.log(files);

    handleFiles(Array.from(files));
  }
  function handleFiles(files: File[]) {
    if (files.length == 0) { return "File list is empty"; }
      console.log("files are: ", files, "fileList is: ", fileList);
      fileList.push(...files);
      console.log(fileList);
  }
  // Component TSX
  return (
    <div className={styles.wrapper}>
      <div id="dragArea" className={isDragging ? styles.dragging : styles.dropArea} onDrop={handleDrop} onDragOver={handleDragOver}  onDragLeave={handleDragLeave}>
        <div className={styles.textWrapper}>
          <img id={styles.cloudIcon} src="/src/public/cloud-upload-white.svg" alt="cloud upload" />
          <span>Drag your videos here</span>
          <span>or select from your device</span>
          <label htmlFor="selectedFile" className={styles.selectedFile}>Select your file</label>
          <input className={styles.fileInput} id="selectedFile" type="file" accept="video/*" multiple onChange={handleInput} />
          <span id={styles.formatsText}>{"Accepted file formats - " + "maxFileSize"}</span>
          <MainButton  content="Upload videos" onClick={uploadVideos}></MainButton>
        </div>
      </div>
    </div>
  )
}
async function uploadVideos() {
  fileList.forEach(async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    try {
        await uploadAPI("http://127.0.0.1:8000/upload", formData);
      } catch (e) {
          console.log(e);
      }
  })
}
async function uploadAPI(url: string, formData: FormData) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response;
}

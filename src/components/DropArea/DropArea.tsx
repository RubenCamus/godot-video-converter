import { useState } from "react";
import MainButton from "../MainButton/MainButton"
import styles from './DropArea.module.css';
import { maxFileSize } from '../../config';
var fl : File[] = [];
export default function DropArea({ onUpload }: { onUpload: () => void }) {
  const [fileList, setFileList] = useState<File[]>([]);
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
    // Loop through added files
    files.forEach(file => {
      const fileSize = file.size;
      const fileSizeMegabytes = (fileSize / 1024) / 1024;
      if (fileSizeMegabytes > maxFileSize) {
        alert(`File: ${file.name} exceeds maximum file size`);
        files.splice(files.indexOf(file), 1);
      }
    });
    console.log("files are: ", files, "fileList is: ", fileList);
    const newfl = fileList;
    fl.push(...files);
    setFileList(fl);
    console.log(fileList);
  }
  async function uploadVideos() {
    fileList.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file); // carries video data and is the correct format for API req
      try {
        const response = await uploadAPI("http://127.0.0.1:8000/upload", formData);
        } catch (e) {
            console.log(e);
      }
      setFileList([]);
      onUpload(); // callback function to upload UI
    })
  }
  async function uploadAPI(url: string, formData: FormData) {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return response;
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
          <div>
            <p>Loaded videos</p>
            {
              fileList.map(video => (
                <div key={video.name}>
                  <p>{video.name}</p>
                  <p>{video.size}</p>
                </div>
              )

              )
            }
          </div>
          <input className={styles.fileInput} id="selectedFile" type="file" accept="video/*" multiple onChange={handleInput} />
          <span id={styles.formatsText}>{"Accepted file formats - " + "maxFileSize"}</span>
          <MainButton  content="Upload videos" onClick={uploadVideos}></MainButton>
        </div>
      </div>
    </div>
  )
}

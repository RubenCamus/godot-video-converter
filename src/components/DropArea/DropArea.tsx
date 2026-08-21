import { useEffect, useState } from "react";
import MainButton from "../MainButton/MainButton"
import styles from './DropArea.module.css';
import { maxFileSize } from '../../config';
import FileVideo from "../FileVideo/FileVideo";
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

    handleFiles(Array.from(files));
  }
  function checkDuplicateFiles(file: File) {
    for (const fl of fileList) {
      if (fl.name == file.name) {
        return true;
      }
    }
  }
  function handleFiles(files: File[]) {
    if (files.length == 0) { return "File list is empty"; }
    // Loop through added files
    const newfl= [...fileList];
    for (const file of files) {
      const fileSize = file.size;
      const fileSizeMegabytes = (fileSize / 1024) / 1024;
      if (fileSizeMegabytes > maxFileSize) {
        alert(`File: ${file.name} exceeds maximum file size`);
        files.splice(files.indexOf(file), 1);
        continue;
      }
      var isDuplicate = checkDuplicateFiles(file);
      if (isDuplicate == true) {
        files.splice(files.indexOf(file), 1);
        continue;
      }
      newfl.push(file);
      setFileList(newfl);
      console.log("updated fileList is: ", fileList);
    };
  }
  function removeFile(filename: string) {
    const newfl = [...fileList];
    newfl.forEach(file => {
      if (file.name == filename) {
        const indexToDelete = newfl.indexOf(file);
        newfl.splice(indexToDelete, 1);
        setFileList(newfl);
      }
    })
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
          <p style={{color: "var(--color-primary)"}}>Loaded videos</p>
          <div className={styles.fileVideos}>
            {
              fileList.map(video => (

                <FileVideo key={video.name} videoData={video} removeFn={() => removeFile(video.name)}></FileVideo>
              ))
            }
          </div>
          <input className={styles.fileInput} id="selectedFile" type="file" accept="video/*" multiple onChange={handleInput} />
          <p className={styles.formatsText}>Maximum file size {maxFileSize} MB</p>
          <MainButton  content="Upload videos" onClick={uploadVideos}></MainButton>
        </div>
      </div>
    </div>
  )
}

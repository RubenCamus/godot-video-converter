import MainButton from "../MainButton/MainButton"
import styles from './DropArea.module.css';
export default function DropArea() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <img id={styles.cloudIcon} src="cloud-upload.svg" alt="cloud upload" />
        <span>Drag your videos here</span>
        <span>or select from your device</span>
        <MainButton content={"Select your files here"}/>
        <span id={styles.formatsText}>{"Accepted file formats - " + "maxFileSize"}</span>
      </div>
    </div>
  )
}

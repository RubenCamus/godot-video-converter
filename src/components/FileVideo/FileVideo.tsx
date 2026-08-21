import styles from "./FileVideo.module.css"

export default function FileVideo({ videoData, removeFn }: { videoData: File, removeFn: () => void }) {



  return (
    <div className={styles.wrapper}>
      <img className={styles.crossImage} onClick={() => removeFn()} src="/placeholder.svg" alt="Close cross" />
      <p>
        {videoData.name != "" ? videoData.name : "Placeholder name"}
      </p>
      <p>
        {videoData.size != 0 ? `${((videoData.size/1024) / 1024).toFixed(2)} MB`: 0}
      </p>
    </div>
  )
}

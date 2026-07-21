import styles from './Video.module.css';
import { VideoData } from "../../types/video";
interface VideoComponentProps {
  video: VideoData
}

export default function VideoComponent({video}: VideoComponentProps) {
  return (
    <div className={styles.videoWrapper}>
      <div className={styles.videoImageWrapper}>
        <img src="src/public/placeholder.svg" alt="placeholder image" className={styles.videoImage} />
      </div>
      <div className={styles.videoTextWrapper}>
        <span>{video.filename}</span>
        <div className={styles.videoDataWrapper}>
          <span>{video.format.toUpperCase()}</span>
          <span>{video.length}</span>
        </div>
      </div>
    </div>
  )
}

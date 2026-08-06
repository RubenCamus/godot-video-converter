import styles from './Video.module.css';
import { VideoData } from "../../types/video";
import { downloadVideo } from '../../services/FrontService';
import MainButton from '../MainButton/MainButton';
interface VideoComponentProps {
  video: VideoData
}

export default function VideoComponent({video}: VideoComponentProps) {
  return (
    <div className={styles.videoWrapper}>
      <div className={styles.videoImageWrapper}>
        <img src="/src/public/video-icon-white.svg" alt="placeholder image" className={styles.videoImage} />
      </div>
      <div className={styles.videoTextWrapper}>
        <p>{video.filename}</p>
        <div className={styles.videoDataWrapper}>
          <span>{video.format.toUpperCase()}</span>
          <span>{video.length}</span>
        </div>
      </div>
    </div>
  )
}

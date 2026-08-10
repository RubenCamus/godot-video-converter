import styles from './Video.module.css';
import { VideoData } from "../../types/video";
import { downloadVideo } from '../../services/FrontService';
import MainButton from '../MainButton/MainButton';
import { useState } from 'react';
interface VideoComponentProps {
  video: VideoData
}

export default function VideoComponent({ video }: VideoComponentProps) {

  const [selected, setSelected] = useState(false);
  function handleSelection() {
    setSelected(!selected);
    console.log("Changed selection from", selected, "to ", !selected);
  }
  return (
    <div id='wrap' onClick={handleSelection} className={`${styles.videoWrapper}, ${selected ? styles.videoSelected : styles.videoWrapper}`}>
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

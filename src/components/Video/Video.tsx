import styles from './Video.module.css';
import { VideoData } from "../../types/video";
import { downloadVideo } from '../../services/FrontService';
import MainButton from '../MainButton/MainButton';
import { useState } from 'react';
interface VideoComponentProps {
  video: VideoData
  isSelected: boolean
  parentFunction: () => void
}
export default function VideoComponent({ video, isSelected, parentFunction}: VideoComponentProps) {

  return (
    <div id='wrap' onClick={() => parentFunction()} className={`${styles.videoWrapper}, ${isSelected ? styles.videoSelected : styles.videoWrapper}`}>
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

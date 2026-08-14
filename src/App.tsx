import { createRoot } from 'react-dom/client';
import VideoComponent from './components/Video/Video';
import { VideoData } from './types/video';
import DropArea from './components/DropArea/DropArea';
import MainButton from './components/MainButton/MainButton';
import SecondaryButton from './components/SecondaryButton/SecondaryButton';
import {convertVideo, downloadVideo, getVideos, getOutputVideos} from "./services/FrontService";
import { useEffect, useState } from 'react';

// Import Styles
import './index.css'
import './variables.css'
import { shell } from 'electron/common';
import Footer from './components/Footer/Footer';
import SelectOption from './components/SelectOption/SelectOption';
// Change with API fetch
const App = () => {
  const selectedInputVideos: Array<string> = [];
  function addPollas(name: string) {
    console.log(selectedInputVideos);
    if (selectedInputVideos.includes(name)) {
      const indexToDelete = selectedInputVideos.indexOf(name);
      const removedItem = selectedInputVideos.splice(indexToDelete, 1);
      console.log("Removed Item: ", removedItem);
      return;
    }
    selectedInputVideos.push(name);
    console.log("new selected input is", selectedInputVideos);
  }
  function changeSelected(selected: boolean) {
    return !selected;
  }
  async function getSelectedVideos() {
    const response = await getVideos();
    const videos = response.videos;
    for (let i = 0; i < videos.length; i++) {
      const curVideo = videos[i];
    }
  }
    // On click video component change useState
    // if state is true add to selectedVideos array
    //
  const [selected, setSelected] = useState<boolean>();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [format, setFormat] = useState<string>("ogv");
  async function loadVideos() {
    const response = await getVideos();
    setVideos(response.videos);
  }
  async function loadOutputVideos() {
        const response = await getOutputVideos();
        setOutputVideos(response.videos);
  }
  const [outputVideos, setOutputVideos] = useState<VideoData[]>([]);
  async function onUploadFinished() {
    await loadVideos();
  }
  async function onConvertFinished() {
    await loadOutputVideos();
  }
  return (
    <>
      <DropArea onUpload={onUploadFinished}></DropArea>
      {/*DISPLAY ADDED FILES BEFORE UPLOADING*/}
      {/*ADD UPLOADING PROGRESS*/}
      <div className='videos-title'>
        <h2>Uploads</h2>
        <span>Format: </span>
        <SelectOption></SelectOption>
      </div>
      <div className='dynamic-videos-wrapper'>
        {videos.map(video => (
          <VideoComponent key={video.filename} video={video} isSelected={false} parentFunction={() => addPollas(video.filename)} />
        ))}
      </div>
      <div>
        <MainButton onClick={() => convertVideo(format, onConvertFinished)} content='Convert'></MainButton>
      </div>
      <h2>Converted</h2>
        {/*ADD PROGRESS FOR VIDEO CONVERTING*/}
        <div className='dynamic-videos-wrapper'>
                {outputVideos.map(video => (
                  <VideoComponent key={video.filename} video={video} isSelected={false} parentFunction={() => addPollas(video.filename)}/>
                ))}
        </div>
      {/*<MainButton onClick={() => downloadVideo} content="Download All"></MainButton>*/}
      <MainButton onClick={() => window.api.openOutputFolder()} content='open folder'></MainButton>
      <Footer></Footer>
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

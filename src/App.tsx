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
import Footer from './components/Footer/Footer';
import SelectOption from './components/SelectOption/SelectOption';
// Change with API fetch
const App = () => {
  // const selectedInputVideos: Array<string> = [];
  const [selectedInputVideos, setSelectedInputVideos] = useState<Array<string>>([]);
  const selectedOutputVideos: Array<string> = [];
  function selectedLogic(name: string, array: string) {
    if (array == "input") {
      console.log("selectedVIdeos: ", selectedInputVideos);
      if (selectedInputVideos.includes(name)) {
        const indexToDelete = selectedInputVideos.indexOf(name);
        let newArray = selectedInputVideos;
        newArray.splice(indexToDelete, 1);
        setSelectedInputVideos(newArray);
        console.log("new array is: ", newArray);
        if (selectedInputVideos.length === 0) {
          setCanConvert(false);
        } else {
          console.log("can convert is false");
          setCanConvert(true);
        }
        return;
      } else {
        console.log("AAAA");
        const newArray = [...selectedInputVideos, name];
        setSelectedInputVideos(prevVideos => { return [...prevVideos, name] });
        if (selectedInputVideos.length === 0) {
          setCanConvert(false);
        } else {
          setCanConvert(true);
        }

        console.log("new array ias: ", newArray);
      }
    }
    if (array == "output") {
      console.log("OUTPUT VIDEOS", selectedOutputVideos);
      if (selectedOutputVideos.includes(name)) {
        const indexToDelete = selectedOutputVideos.indexOf(name);
        selectedOutputVideos.splice(indexToDelete, 1);
        console.log("OUTPUT VIDEOS", selectedOutputVideos);
        return;
      }
      selectedOutputVideos.push(name);
      console.log(selectedOutputVideos);
    }
  }
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [outputVideos, setOutputVideos] = useState<VideoData[]>([]);
  const [format, setFormat] = useState<string>("ogv");
  const [canConvert, setCanConvert] = useState<boolean>(false);
  async function loadVideos() {
    const response = await getVideos();
    if (response.success == false ) {
      setVideos([]);
      return "Error: No videos found on fetch."
    }
    setVideos(response.videos);
  }
  async function loadOutputVideos() {
        const response = await getOutputVideos();
        setOutputVideos(response.videos);
  }
  async function onUploadFinished() {
    await loadVideos();
  }
  async function onConvertFinished() {
    await loadOutputVideos();
  }
  // Load videos on start and refresh
  useEffect(() => {
    loadVideos();
    loadOutputVideos();
    return () => {
      setVideos([]);
      setOutputVideos([]);
    }
  },[setVideos, setOutputVideos])
  return (
    <>
      <DropArea onUpload={onUploadFinished}></DropArea>
      {/*DISPLAY ADDED FILES BEFORE UPLOADING*/}
      {/*ADD UPLOADING PROGRESS*/}
      <div className='videos-title'>
        <h2>Uploads</h2>
        <span>Format: </span>
        <SelectOption updateFormat={(fr) => setFormat(fr)}></SelectOption>
      </div>
      <div className='dynamic-videos-wrapper'>
        {
          // Input Video components TODO => Refactor into reusable logic and cleaner
          videos.map(video => (
          <VideoComponent key={video.filename} video={video}  parentFunction={() => selectedLogic(video.filename, "input")} />
        ))}
      </div>
      <div>
        <MainButton onClick={() => convertVideo(format, onConvertFinished, selectedInputVideos)} canConvert={canConvert} content='Convert'></MainButton>
      </div>
      <h2>Converted</h2>
        {/*TODO ADD PROGRESS FOR VIDEO CONVERTING*/}
        <div className='dynamic-videos-wrapper'>
                {outputVideos.map(video => (
                  <VideoComponent key={video.filename} video={video}  parentFunction={() => selectedLogic(video.filename, "output")}/>
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

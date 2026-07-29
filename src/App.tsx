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
// Change with API fetch
const App = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  useEffect(() => {
    async function loadVideos() {
      const response = await getVideos();
      setVideos(response.videos);
    }
    loadVideos();
  }, []);

  const [outputVideos, setOutputVideos] = useState<VideoData[]>([]);
  useEffect(() => {
    async function loadOutputVideos() {
      const response = await getOutputVideos();
      setOutputVideos(response.videos);
    }
    loadOutputVideos();
  }, []);


  return (
    <>
      <DropArea></DropArea>
      <div className='videos-title'>
        <h2>Uploads</h2>
        <SecondaryButton content='Choose Format'></SecondaryButton>
      </div>
      <div className='dynamic-videos-wrapper'>
        {videos.map(video => (
          <VideoComponent key={video.filename} video={video} />
        ))}
      </div>
      <div>
        <MainButton onClick={convertVideo} content='Convert'></MainButton>
      </div>
      <div>
        <h2>Converted</h2>
        <div className='dynamic-videos-wrapper'>
                {outputVideos.map(video => (
                  <VideoComponent key={video.filename} video={video} />
                ))}
              </div>
      </div>
      <MainButton onClick={() => downloadVideo} content="Download All"></MainButton>
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

import { createRoot } from 'react-dom/client';
import VideoComponent from './components/Video/Video';
import { VideoData } from './types/video';
import DropArea from './components/DropArea/DropArea';
import MainButton from './components/MainButton/MainButton';
import SecondaryButton from './components/SecondaryButton/SecondaryButton';
import {convertVideo, downloadVideo, getVideos} from "./services/FrontService";
import { useState } from 'react';
// Change with API fetch
const App = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  async function loadVideos() {
    const response = await getVideos();
    setVideos(response.videos);
  }
  loadVideos();
  return (
    <>
      <DropArea></DropArea>
      <h2>Your videos</h2>
      <>
        {videos.map(video => (
          <VideoComponent video={video} />
        ))}
      </>
      <div>
        <SecondaryButton content='Choose Format'></SecondaryButton>
        <MainButton onClick={convertVideo} content='Convert'></MainButton>
        <MainButton onClick={downloadVideo} content="Download"></MainButton>
      </div>
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

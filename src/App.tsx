import { createRoot } from 'react-dom/client';
import VideoComponent from './components/Video/Video';
import { VideoData } from './types/video';
import DropArea from './components/DropArea/DropArea';
import MainButton from './components/MainButton/MainButton';
import SecondaryButton from './components/SecondaryButton/SecondaryButton';
import {convertVideo,getVideos} from "./services/FrontService";
// Change with API fetch
const video: VideoData = {
  filename: "placeholder.mp4",
  format: "mp4",
  size: 15010,
  length: 30
}
const App = () => {
  return (
    <>
      <DropArea></DropArea>
      <h2>Your videos</h2>
      <VideoComponent video={video} />
      <div>
        <SecondaryButton content='Choose Format'></SecondaryButton>
        <MainButton content='Convert'></MainButton>
        <MainButton onClick={getVideos} content='Get Videos'></MainButton>
      </div>
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

import { createRoot } from 'react-dom/client';
import VideoComponent from './components/Video/Video';
import { VideoData } from './types/video';
import DropArea from './components/DropArea/DropArea';
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
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

interface VideoData {
  filename: string;
  format: string;
  size: number;
  length: number;
}

let data: VideoData

export default function VideoComponent() {
  return (
    <div>
      <img src="placeholder.png" alt="placeholder image" />
      <div>
        <span>{data.filename = "Video Title"}</span>
        <span>{data.format = "MP4"}</span>
        <span>{data.length = 30}</span>
      </div>
    </div>
  )
}

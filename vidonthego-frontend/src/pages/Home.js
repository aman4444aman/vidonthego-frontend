import React, { useState } from 'react';
import UploadVideo from '../components/UploadVideo';
import Playback from './Playback';
import './Home.css';

function Home() {
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUpload = (file) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  return (
    <div className="home-container">
      <h1 className="title">VidOnTheGo</h1>
      <UploadVideo onUpload={handleUpload} />
      {videoUrl && <Playback videoUrl={videoUrl} />}
    </div>
  );
}

export default Home;
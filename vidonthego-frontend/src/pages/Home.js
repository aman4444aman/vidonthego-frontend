import React, { useState } from 'react';
import UploadVideo from '../components/UploadVideo';
import Playback from './Playback';
import './Home.css';

function Home() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [mode, setMode] = useState('original'); // lifted up from Playback

  const handleUpload = (file) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  return (
    <div className="home-container glass-card fade-in">
      {mode !== 'podcast' && (
        <img
          src="/echomindslogo.png"
          alt="Echo Minds Logo"
          className="team-logo fade-in"
        />
      )}
      <h1 className="title fade-in">VidOnTheGo</h1>
      <UploadVideo onUpload={handleUpload} />
      {videoUrl && <Playback videoUrl={videoUrl} mode={mode} setMode={setMode} />}
    </div>
  );
}

export default Home;

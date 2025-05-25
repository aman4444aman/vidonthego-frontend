import React, { useState } from 'react';
import PlayerControls from '../components/PlayerControls';
import './Playback.css';

function Playback({ videoUrl }) {
  const [mode, setMode] = useState('original');

  return (
    <div className="playback-container">
      <h2 className="playback-mode">Mode: {mode}</h2>
      <PlayerControls mode={mode} setMode={setMode} />
      <video controls width="640" className="playback-video">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}

export default Playback;

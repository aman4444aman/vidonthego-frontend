import React from 'react';
import './PlayerControls.css';

function PlayerControls({ mode, setMode }) {
  return (
    <div className="controls-container">
      <button className={`mode-button ${mode === 'original' ? 'active' : ''}`} onClick={() => setMode('original')}>Original</button>
      <button className={`mode-button ${mode === 'narrated' ? 'active' : ''}`} onClick={() => setMode('narrated')}>Narrated</button>
      <button className={`mode-button ${mode === 'podcast' ? 'active' : ''}`} onClick={() => setMode('podcast')}>Podcast</button>
    </div>
  );
}

export default PlayerControls;

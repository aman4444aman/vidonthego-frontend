import React from 'react';
import './NarrationControls.css'; 

function NarrationControls({ mode, setMode }) {
  return (
    <div className="narration-controls">
      <div className="mode-switch">
        <button
          className={`mode-button ${mode === 'original' ? 'active' : ''}`}
          onClick={() => setMode('original')}
        >
          Original
        </button>
        <button
          className={`mode-button ${mode === 'narrated' ? 'active' : ''}`}
          onClick={() => setMode('narrated')}
        >
          Narrated
        </button>
        <button
          className={`mode-button ${mode === 'podcast' ? 'active' : ''}`}
          onClick={() => setMode('podcast')}
        >
          Podcast
        </button>
      </div>
    </div>
  );
}

export default NarrationControls;

import React from 'react';
import './PodcastCover.css';

function PodcastCover() {
  return (
    <div className="podcast-cover">
      <img src="/echomindslogo.png" alt="Podcast Cover" />
      <h2>Episode Title</h2>
      <p>Brief episode summary and tags</p>
    </div>
  );
}

export default PodcastCover;

import React from 'react';
import './ChapterList.css';

function ChapterList({ chapters, onJump, onSelect }) {
  return (
    <div className="chapter-list">
      <h3>Chapters</h3>
      {chapters.map((chapter, idx) => (
        <button
          key={idx}
          className="chapter-button"
          onClick={() => {
            onJump(chapter.time);
            onSelect(chapter);
          }}
        >
          {chapter.title} ({chapter.emotion})
        </button>
      ))}
    </div>
  );
}

export default ChapterList;

import React from 'react';
import './SummaryPopup.css';

function SummaryPopup({ chapter, onClose }) {
  return (
    <div className="summary-popup">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>{chapter.title}</h3>
      <p><strong>Emotion:</strong> {chapter.emotion}</p>
      <p>{chapter.summary}</p>
    </div>
  );
}

export default SummaryPopup;

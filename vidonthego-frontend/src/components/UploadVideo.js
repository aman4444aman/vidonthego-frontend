import React, { useState } from 'react';
import './UploadVideo.css';

function UploadVideo({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept="video/*" onChange={handleFileChange} className="upload-input" />
      <button onClick={handleUpload} className="upload-button">Upload</button>
    </div>
  );
}

export default UploadVideo;

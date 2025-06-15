import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa'; // ✅ Import icon here
import './UploadVideo.css'; //  ✅ Import CSS for styling

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
  <div className="upload-container glass-card fade-in">
    <input
      type="file"
      accept="video/*"
      className="upload-input"
      onChange={handleFileChange}
    />
    <button className="upload-button" onClick={handleUpload}>
      <FaUpload /> Upload
    </button>
  </div>
 );

}

export default UploadVideo;

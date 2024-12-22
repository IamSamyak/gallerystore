import React, { useState } from 'react';
import { CloudUpload, Delete } from '@mui/icons-material';
import './UploadAssets.css';

const UploadAssets = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    location: '',
    cost: '',
  });

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.files;
    if (items.length > 0) {
      setFiles([...files, ...items]);
    }
  };

  const handleSubmit = () => {
    if (!formData.customerName || !formData.location || !formData.cost || files.length === 0) {
      alert('Please fill all fields and upload files.');
      return;
    }

    const uploadData = new FormData();
    files.forEach((file) => uploadData.append('files', file));
    uploadData.append('customerName', formData.customerName);
    uploadData.append('location', formData.location);
    uploadData.append('cost', formData.cost);

    // Replace with your upload API URL
    fetch('https://your-upload-api-url.com', {
      method: 'POST',
      body: uploadData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Upload Successful:', data);
        alert('Upload Successful!');
        setFiles([]);
        setFormData({ customerName: '', location: '', cost: '' });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Upload Failed!');
      });
  };

  return (
    <div className="admin-page">
      <div className="upload-container">
        <h2 className="upload-title">Upload Assets</h2>

        <div className="input-group">
          <label htmlFor="customerName" className="input-label">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="location" className="input-label">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="cost" className="input-label">Cost:</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div className="paste-area" onPaste={handlePaste}>
          <p>Paste your files here (Ctrl + V)</p>
        </div>

        <div className="upload-button-group">
          <button
            className="upload-button"
            onClick={() => document.getElementById('fileUpload').click()}
          >
            <CloudUpload className="upload-icon" />
            Upload Files
          </button>
          <input
            type="file"
            id="fileUpload"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {files.length > 0 && (
          <div className="file-list">
            <h4>Files to Upload:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index} className="file-item">
                  <span>{file.name}</span>
                  <button
                    className="delete-button"
                    onClick={() => handleFileRemove(index)}
                  >
                    <Delete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadAssets;

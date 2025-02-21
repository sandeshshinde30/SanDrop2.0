import React, { useState, useRef, useEffect } from 'react';
import "../index.css";
import { uploadFile, getSignedUrl } from '../services/api';
import axios from 'axios';

const FileUpload = () => {
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const response = await getSignedUrl();
      setUrl(response.url);
    };
    getData();  
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a file.');
    }
  };

  const generateUniqueCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      await uploadFile(url, file);
      const finalUrl = url.split('?')[0];
      setUrl(finalUrl);
      
      const uniqueCode = generateUniqueCode();
      
      try {
        await axios.post('http://localhost:8000/api/store-file', {
          fileUrl: finalUrl,
          uniqueCode: uniqueCode
        });
        alert(`File successfully uploaded with code: ${uniqueCode}`);
      } catch (err) {
        console.error('Error storing file data:', err);
        alert('Error storing file information.');
      }
      
      setFile(null);
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setError('No file selected.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Choose a file to upload
          </label>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div> : 'Upload'}
        </button>
      </form>

      {/* <div className="mt-4 text-center">
        <p className="text-gray-700">Uploaded file URL:</p>
        <a target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {url.split('?')[0]}
        </a>
      </div> */}
    </div>
  );
};

export default FileUpload;

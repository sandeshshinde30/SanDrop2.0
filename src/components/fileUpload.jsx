import React, { useState,useRef,useEffect } from 'react';
import "../index.css";
import { uploadFile, getSignedUrl } from '../services/api';

const FileUpload = () => {
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const response = await getSignedUrl();
      // console.log(response.url);
      setUrl(response.url);
    }
    getData();  
  }, [])

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        await uploadFile(url, file);
        setUrl(url.split('?')[0]);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a file.');
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Choose a file to upload
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        >
          Upload
        </button>
      </form>

      
        <div className="mt-4 text-center">
          <p className="text-gray-700">Uploaded file URL:</p>
          <a  target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {url.split('?')[0]}
          </a>
        </div>
      
    </div>
  );
};

export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';

const FileDownload = () => {
  const [code, setCode] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!code.match(/^\d{6}$/)) {
      setError('Please enter a valid 6-digit code.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/get-file/${code}`);
      setFileUrl(response.data.fileUrl);
    } catch (err) {
      setError('Invalid code or file not found.');
      console.error('Error fetching file:', err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Download File</h2>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div> : 'Download'}
        </button>
        {fileUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">File is ready to download:</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Click here to download
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDownload;
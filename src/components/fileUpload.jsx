import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import { uploadFile, getSignedUrl } from "../services/api";
import axios from "axios";
import { Plus, Send } from "lucide-react"; 
import { FileText, Image, File, FileVideo, FileAudio, FileArchive, FileCode } from "lucide-react";


const FileUpload = () => {
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return <Image size={24} className="text-blue-500" />;
    if (fileType.startsWith("video/")) return <FileVideo size={24} className="text-red-500" />;
    if (fileType.startsWith("audio/")) return <FileAudio size={24} className="text-green-500" />;
    if (fileType === "application/pdf") return <FileText size={24} className="text-red-500" />;
    if (fileType.includes("word")) return <FileText size={24} className="text-blue-700" />;
    if (fileType.includes("zip") || fileType.includes("rar")) return <FileArchive size={24} className="text-yellow-600" />;
    if (fileType.includes("json") || fileType.includes("xml") || fileType.includes("javascript")) return <FileCode size={20} className="text-purple-500" />;
    return <File size={20} className="text-gray-500" />;
  };

  const formatFileSize = (size) => {
    return size < 1024
      ? `${size} B`
      : size < 1024 * 1024
      ? `${(size / 1024).toFixed(2)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };


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
      setError("");
    } else {
      setError("Please select a file.");
    }
  };

  const generateUniqueCode = () => {
    return Math.floor(100000 + Math.random() * 900000); 
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      await uploadFile(url, file);
      const finalUrl = url.split("?")[0];
      setUrl(finalUrl);

      const uniqueCode = generateUniqueCode();

      try {
        await axios.post("http://localhost:8000/api/store-file", {
          fileUrl: finalUrl,
          uniqueCode: uniqueCode,
        });
        alert(`File successfully uploaded with code: ${uniqueCode}`);
      } catch (err) {
        console.error("Error storing file data:", err);
        alert("Error storing file information.");
      }

      setFile(null);
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setError("No file selected.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >

      <h1 className="text-xl font-extrabold tracking-wide text-[#0077B6]">Send File</h1>
      
        <div className="flex items-center gap-3 border border-dashed border-gray-400 p-3 rounded-lg cursor-pointer">
            
            <label htmlFor="file" className="cursor-pointer flex items-center gap-2">
            <Plus className="text-blue-500" size={20} />
            <span className="text-gray-700 text-sm">Choose a file</span>
          </label>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

      
        {file && (
  <div className="w-full">
    <div className="flex items-center justify-between bg-gray-200 px-3 py-2 rounded-lg relative group">
      <div className="flex items-center gap-2">
        {getFileIcon(file.type)}
        <span 
          className="text-gray-700 text-sm truncate max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
          title={file.name}
        >
          {file.name}
        </span>
      </div>
      
 
      <span className="text-gray-500 text-xs group-hover:hidden">
        {formatFileSize(file.size)}
      </span>

    
      <button 
        onClick={() => setFile(null)} 
        className="text-red-500 hover:text-red-700 hidden group-hover:block"
        title="Remove file"
      >
        ❌
      </button>
    </div>

    <div className="w-full mt-4">
      <button
        type="button"
        className="w-full flex items-center justify-center text-white bg-[#0077B6] py-2 px-4 rounded-lg hover:bg-[#023E8A] focus:ring-2 focus:ring-blue-500"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-md font-medium">Send</h1>
            <Send size={18} />
          </div>
        )}
      </button>
    </div>
  </div>
)}





       
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default FileUpload;

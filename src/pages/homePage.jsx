import React from "react";
import FileUpload from "../components/fileUpload";
import FileDownload from "../components/fileDownload";
import Navbar from "../components/navBar";

function HomePage() {
  
    return (
        <div className="flex bg-gray-100 ">
            <div className="w-1/2">
                <img src="mainImg.png" alt="file sharing" />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center h-auto gap-8 p-6  ">
            <FileUpload />
            <FileDownload />
        </div>
        </div>
    );
}

export default HomePage;

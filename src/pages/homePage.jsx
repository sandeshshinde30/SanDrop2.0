import React from "react";
import FileUpload from "../components/fileUpload";
import FileDownload from "../components/fileDownload";
import Navbar from "../components/navBar";

function HomePage() {
  
    return (
        <div>
            {/* <Navbar/> */}
            <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-8 p-6 bg-gray-100">
            <FileUpload />
            <FileDownload />
        </div>
        </div>
    );
}

export default HomePage;

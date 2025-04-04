import React from "react";
import img1 from "../assest/image.jpg";
import img2 from "../assest/image1.jpg";
import img3 from "../assest/image2.jpg";

const sampleContent = [
  { id: 1, url: img1, type: "image" },
  { id: 2, url: img2, type: "image" },
  { id: 3, url: img3, type: "image" },
  { id: 4, url: img1, type: "video" },
  { id: 5, url: img2, type: "image" },
  { id: 6, url: img3, type: "image" }
];

const UnsplashGrid = () => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 p-4">
      {sampleContent.map((item) => (
        <div 
          key={item.id} 
          className="relative break-inside-avoid mb-4 overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl group">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt="Random"
              className="w-full h-auto object-cover rounded-lg transition-all duration-300 group-hover:blur-md group-hover:brightness-75"
            />
          ) : (
            <video
              src={item.url}
              controls
              className="w-full h-auto object-contain rounded-lg transition-all duration-300 group-hover:blur-md group-hover:brightness-75"
            ></video>
          )}

          {/* Overlay Effect */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-lg font-bold">Awesome Content</p>
            <div className="flex gap-3 mt-2">
              <span className="text-sm"><i className="fa-solid fa-heart"></i> 120</span>
              <span className="text-sm"><i className="fa-solid fa-comment"></i> 45</span>
            </div>
          </div>

          {/* Border Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute top-0 left-0 w-0 h-[2px] bg-cyan-800 transition-all duration-200 group-hover:w-full"></span>
            <span className="absolute top-0 right-0 w-[2px] h-0 bg-cyan-800 transition-all duration-200 delay-200 group-hover:h-full"></span>
            <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-cyan-800 transition-all duration-200 delay-400 group-hover:w-full"></span>
            <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-cyan-800 transition-all duration-200 delay-600 group-hover:h-full"></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnsplashGrid;
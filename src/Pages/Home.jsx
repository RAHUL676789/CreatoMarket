import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { initContent } from "../features/content/contentSlice.js";

const Home = () => {
  const URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.content);
  const [content, setContent] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const getAll = async () => {
    try {
      const response = await fetch(`${URL}/content/getAll`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        dispatch(initContent(result.data));
        setContent(result.data);
      }
    } catch (error) {
      console.log("Error fetching content:", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleCurrentItemm = (item) => {
    setCurrentItem(item);
  };

  return (
    <div className="h-screen w-full relative">
      {/* 🏞️ Grid Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-2 gap-4 p-4">
        {content?.map((item, i) => (
          <HomeCard key={i} card={item} func={handleCurrentItemm} />
        ))}
      </div>

      {/* 🏠 Background Overlay */}
      {currentItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-30"></div>
      )}

      {/* 🎯 Foreground Content (Current Item) */}
      {currentItem && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="w-[90%] max-w-2xl bg-white shadow-lg   scrollbar-hidden overflow-auto max-h-screen px-4 mt-4">
            {/* 🔹 Header (Fixed at Top) */}
            <div className=" text-white py-4 px-6 text-center font-semibold text-lg sticky top-0 left-0 w-full z-50 flex justify-between border ">
              <div className="user py-2 cursor-pointer   gap-2 pr-12 text-black flex justify-center items-center">
                {currentItem?.owner?.profilePic != "" ? <img src={currentItem?.owner?.profilePic} /> : <i className="fa-solid fa-user p-1 text-[20px]   text-gray-500 h-10 w-10 !inline-flex justify-center items-center bg-gray-50 rounded-full py-2  "></i>}
                <div className="">
                  <h1 className=" leading-4 ">{currentItem?.title}</h1>
                  <p className="text-xs text-gray-500">{currentItem?.owner?.username}</p>

                </div>
              </div>
              <div className="btns h-12 p-2 text-black gap-2 flex ">
                    <i className="fa-solid fa-heart !inline-flex justify-center items-center px-2  opacity-65 hover:opacity-100 bg-gray-100 border rounded-xs cursor-pointer">

                    </i>
                    <i className="fa-solid fa-add  !inline-flex justify-center items-center px-2  border rounded-xs bg-gray-100 opacity-65 hover:opacity-100 cursor-pointer">

                    </i>

                    <button className=" text-white font-light text-xs px-4 rounded-xs bg-green-700 hover:font-semibold  cursor-pointer">Download</button>
              </div>
            </div>

            {/* 🖼️ Image Display */}
            {currentItem?.url?.endsWith(".jpg") || currentItem?.url?.endsWith(".png") ? (
              <img src={currentItem?.url} alt="Content" className="w-full max-h-96 object-cover mt-4" />
            ) : null}

            {/* 🎥 Video Display */}
            {currentItem?.url?.endsWith(".mp4") ? (
              <video controls className="w-full mt-4">
                <source src={currentItem?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}

            {/* 📜 Description */}
            <div className="text-gray-800 font-bold">
              {currentItem?.description ? <p>{currentItem?.description}</p> : <p>No description available.</p>}
            </div>

            {/* 🔽 Footer */}
            <div className=" py-4 px-6 text-center text-sm sticky bottom-0 left-0 w-full z-50 flex justify-around">
             
              <div className="likes">
                  <p className="text-gray-500">Likes</p>
                  <span className="text-gray-800 font-semibold"> {currentItem?.likes}</span>
              </div>

              <div className="downloads">
                <p className="text-gray-500">Downloads</p>
               <span className="text-gray-800 font-semibold"> {currentItem?.downLoads}</span>
          

              </div>
              <div className="share">
                    <p className="text-gray-500"><i className=" text-black fa-solid fa-share mr-1"></i>Share</p>

              </div>
            </div>

            {/* ❌ Close Button */}
            <div className="text-center my-4  max-h-40 overflow-scroll scrollbar-hidden ">
             <div className="comments flex flex-wrap">
                   {
                    [...Array(8)].map((ite)=>(<div className="w-[100%] border flex justify-start p-4 ">
                      jais hree rma
                      </div>))
                   }
             </div>
            </div>
          </div>

          <div className="close absolute top-0 right-2 text-white">
            <i className="fa-solid fa-xmark hover:scale-110 cursor-pointer" onClick={()=>setCurrentItem(null)}></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React from 'react';

const HomeCard = ({ card ,func}) => {
  return (
    <div onDoubleClick={()=>func(card)}  className="mb-4 break-inside-avoid cursor-pointer">
      <div className="relative group">
        {/* Image */}
        <img src={card?.url} alt="Image" className="w-full shadow    " />

        {/* Black Overlay (visible on hover) */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-10    "></div>

        {/* Foreground UI (like, comment, user) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">

          {/* Top section */}
          <div className="flex justify-end gap-2">
            <div className="h-8 w-8   cursor-pointer bg-white  text-black flex items-center justify-center rounded-xs  opacity-65 hover:opacity-100   shadow">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="h-8 w-8   cursor-pointer bg-white text-black flex items-center justify-center  rounded-xs opacity-65 hover:opacity-100   shadow">
              <i className="fa-solid fa-comment opacity-65 hover:opacity-100 "></i>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex justify-between items-center ">
            <div className="user flex  w-[50%] justify-start items-center cursor-pointer text-white  px-2 py-1  shadow">
              <div className="h-8 w-8 border flex justify-center items-center  rounded-full p-2 mr-1 ">


                {
                  card?.owner?.profilePic != "" ? <img src={card?.owner?.profilePic} className="h-6 w-6 rounded-full" alt="" />
                    : <i className="fa-solid fa-user "></i>

                }
              </div>

              <div className="text-xs flex flex-col gap-0 leading-3">
              
                <p className="text-[16px]">{card?.owner?.username}</p>
                <p>{card?.title}</p>
              </div>
            </div>
            <div className="download p-2 text-xs bg-white text-black flex items-center justify-center rounded-xs hover:font-bold  cursor-pointer  shadow">
              <i className="fa-solid fa-download opacity-65 hover:opacity-100 m-1 "></i>
              <span>Downloads</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeCard;

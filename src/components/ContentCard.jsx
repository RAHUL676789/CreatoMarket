import React, { useState } from "react";
import img1 from "../assest/image1.jpg";
import SkeletonCard from "./SkeletonCard";

const ContentCard = ({ card ,deleteFunc,editFunc}) => {
  const [showComments, setShowComments] = useState(false);
  
  // console.log(card)

  // Sample Comments Data
  const comments = [
    "Nice picture!",
    "Awesome work 🔥",
    "Where can I buy this?",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
    "Love the colors! ❤️",
  ];

  return (
<div onDoubleClic className="break-inside-avoid">


   
    <div
      onClick={()=>showComments && setShowComments(false)}
      className="relative group overflow-hidden bg-white shadow-lg
      w-full">
      {/* Image */}
      <img
        className="h-fit w-fit contain-content "
        src={card?.url}
        alt="Card Image"
      />

      {/* Overlay */}
      <div
    className="overLay  h-full w-full opacity-30 absolute bg-gray-100 top-0 hover:opacity-65 transition-all duration-150 ease-in-out">

      </div>

      {/* Header */}
      <div className="header flex justify-between absolute px-5 w-full py-2 top-0">
        <p className="text-sm">
          <i className="fa-solid fa-heart mr-1 text-sm text-red-700"></i>{card?.likes}
        </p>
        <p
          className="text-sm cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <i className="fa-solid fa-comment mr-1 text-white text-sm"></i>{card?.comment?.length || 0}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col px-2 content absolute bottom-16 leading-tight indent-0 w-full">
        <p className="line-clamp-1 font-bold uppercase m-0">{card?.title}</p>
        <span className="inline-block">{card?.description}</span>
        <span className="font-semibold">Price &#8377;{card?.price}</span>
      </div>

      {/* Bottom */}
      <div className="bottom absolute flex justify-between w-full px-3 py-2 bottom-0">
        <i onClick={deleteFunc} className="fa-solid fa-trash cursor-pointer text-red-800"></i>
        <p>
          <i  onClick = {editFunc}className="fa-solid fa-pen cursor-pointer text-purple-900"></i>
        </p>
      </div>

      {/* 🔥 Border Animation 🔥 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Border */}
        <span className="absolute top-0 left-0 w-0 h-[2px] bg-cyan-800 transition-all duration-200 group-hover:w-full"></span>
        {/* Right Border */}
        <span className="absolute top-0 right-0 w-[2px] h-0 bg-cyan-800 transition-all duration-200 delay-200 group-hover:h-full"></span>
        {/* Bottom Border */}
        <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-cyan-800 transition-all duration-200 delay-400 group-hover:w-full"></span>
        {/* Left Border */}
        <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-cyan-800 transition-all duration-200 delay-600 group-hover:h-full"></span>
      </div>

      {/* 🔥 Comment Section (Show/Hide) 🔥 */}
      <div
        className={`absolute  left-0 px-2 w-full h-[50%] overflow-scroll scrollbar-hidden bg-gray-100  transition-all duration-300 
        ${showComments ? "bottom-0 opacity-100" : "-bottom-40 opacity-0"}
        `}
      >
        <h4 className="text-sm font-bold">Comments:</h4>
        <ul className="text-xs">
          {card.comments.length>0?card?.comments?.map((comment, index) => (
            <li key={index} className="py-1 border-b text-gray-700">
              {comment}
            </li>
          )):<p>
            no comments yet
            </p>}
        </ul>
      </div>


    </div>
    </div>
  );
};

export default ContentCard;

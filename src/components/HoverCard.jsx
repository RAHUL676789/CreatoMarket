import Button from "./Button";
import videourl from "../assest/video.mp4"
import img1 from "../assest/image.jpg";
import img2 from "../assest/image1.jpg";
import img3 from "../assest/image2.jpg"
import { useEffect,useState } from "react";
export default function HoverCard({image,video,textContent}) {
  const images = [img1,img2,img3]
  const [currIdx, setCurrIdx] = useState(0)
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setFade(false);
      setTimeout(() => {
        // Change image after fade-out
        setCurrIdx((prevIndex) => (prevIndex + 1) % images.length);
        // Fade-in new image
        setFade(true);
      }, 500); // 0.5 sec fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);




  return (
    <div className="relative group w-60 h-60 overflow-hidden rounded-xs shadow-lg cursor-pointer">
      {/* Background Image */}
      {image && (
        <img
          src={img1}
          alt="Card Background"
          className={`w-full h-full object-cover blur-[1px] transition-opacity ease-in-out duration-700 scale-105 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {video && 
      <video src={videourl}
        alt="Card Background"
        className="w-full h-full object-cover bluer transition duration-500 group-hover:blur-md scale-105"
        playsInline
        autoPlay
        
       
        muted
       
      >

        </video>}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.95px] transition-all duration-500 group-hover:bg-black/50 text-center flex flex-col justify-start items-center ">
         <div className="div gap-2 flex flex-col mt-3">
         <h1 className="font-bold text-white ">
           { image && "Total-Images-content"  } 
           { video && "Total-video-content" } 
           { textContent && "Total-textual-content"  } 
            </h1>
            <Button content="know more" className="bg-white font-bold !px-6" icon={true}/>
         </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0">
        <h3 className="text-xl font-semibold">Epic Collection</h3>
        <p className="text-sm text-gray-300">Price: ₹1499</p>
        <div className="flex justify-between mt-2 text-sm text-gray-300">
          <span>❤️ 320 Likes</span>
          <span>💬 87 Comments</span>
        </div>
      </div>

      {/* Animated Border (After-like effect) */}
      <div className="absolute inset-0 border border-white rounded-xs scale-0 group-hover:scale-100 transition-transform duration-700 ease-out pointer-events-none"></div>
    </div>
  );
}

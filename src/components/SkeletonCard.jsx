const SkeletonCard = () => {
  return (
    <div className=" relative group overflow-hidden bg-gray-200 shadow-lg animate-pulse w-[100%] md:w-[46%] min-h-[250px]  rounded-lg m-2">
      {/* Background Blur (Simulating Image Load) */}
      <div className="absolute inset-0 bg-gray-300"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#ffffff] bg-opacity-20"></div>

      {/* Header (Like & Comment Icons) */}
      <div className="absolute top-2 px-5 w-full flex justify-between">
        <div className="w-10 h-4 bg-gray-300 rounded"></div>
        <div className="w-10 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div className="absolute bottom-16 px-2 w-full">
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>

      {/* 🔥 Border Animation 🔥 */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-0 left-0 w-0 h-[2px] bg-cyan-800 transition-all duration-200 group-hover:w-full"></span>
        <span className="absolute top-0 right-0 w-[2px] h-0 bg-cyan-800 transition-all duration-200 delay-200 group-hover:h-full"></span>
        <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-cyan-800 transition-all duration-200 delay-400 group-hover:w-full"></span>
        <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-cyan-800 transition-all duration-200 delay-600 group-hover:h-full"></span>
      </div>

      {/* Bottom Actions (Trash & Edit Icons) */}
      <div className="absolute bottom-2 px-3 w-full flex justify-between">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
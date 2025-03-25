import React from 'react'
import Loader from './Loader'

const Button = ({className,content,icon,disabled,loader,func,type}) => {
  // console.log(className.includes("bg-white"))
  // console.log(func);
  const handleClick = ()=>{
    if(func){
      func();
    }
    return;
  }
  return (
    <>
      <button 
      type={type}
      onClick={handleClick} className={` rounded-4xl  ${className} ${loader && "opacity-80 h-8 w-30"} ${!disabled && "cursor-pointer " } ${className} hover:scale-105 transition-all duration-300`} disabled={disabled}>
            {loader == true ?  <Loader className={`${className?.includes("bg-white")?"bg-[#0e172b]" :"bg-white"}`} /> : content }
            {icon && <i className="fa-solid fa-arrow-right font-light ml-1.5"></i>}
          
      </button>
    </>
  )
}

export default Button

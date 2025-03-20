import React from 'react'

const Button = ({className,content,icon}) => {
  return (
    <>
      <button className={`py-2 px-12 rounded-4xl  ${className} cursor-pointer hover:scale-105 transition-all duration-300`}>
            {content}
            {icon && <i className="fa-solid fa-arrow-right font-light ml-1.5"></i>}
      </button>
    </>
  )
}

export default Button

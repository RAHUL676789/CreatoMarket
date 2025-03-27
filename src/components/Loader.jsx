import React from 'react'

const Loader = ({className}) => {
  return (
    <div className="loader-container absolute w-full h-full opacity-90  ">
    <div className={`loader-bar bar1 ${className}` }></div>
    <div className={`loader-bar bar2 ${className}` }></div>
    <div className={`loader-bar bar3 ${className}` }></div>
    <div className={`loader-bar bar4 ${className}` }></div>
    <div className={`loader-bar bar5 ${className}` }></div>
    <div className={`loader-bar bar6 ${className}` }></div>
    <div className={`loader-bar bar7 ${className}` }></div>
</div>
  )
}

export default Loader

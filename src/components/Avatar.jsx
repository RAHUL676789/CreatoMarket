
import React from 'react'

const Avatar =React.memo( ({username,profilePic}) => {
    console.log("hello")
    let result = username.split(" ");
  if(result.length >  1){
    result = result[0][0] + result[result.length - 1][0];

  }else{
    result = result[0][0] + result[0][1];
  }


    return (
      <div className='text-sm  bg-[#0e172b]  text-white py-1 flex flex-col px-2 border aspect-square h-fit w-fit rounded-full items-center justify-center'>
       { profilePic != "" && <p className='uppercase !inline-flex items-center font-semibold '>{result}</p>
        }

      </div>
    )
  })

export default Avatar

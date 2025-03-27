
import React from 'react'

const Avatar =React.memo(({username,profilePic}) => {
  console.log("hello")
  console.log(profilePic)
  let result = username.split(" ");
if(result.length >  1){
  result = result[0][0] + result[result.length - 1][0];

}else{
  result = result[0][0] + result[0][1];
}


  return (
    <div className={`text-sm  bg-[#0e172b]  text-white  flex flex-col  
    ${profilePic != "" ? "p-0" :"py-1 px-2"}border aspect-square h-fit w-fit rounded-full items-center justify-center`}>
     { profilePic == "" ? <p className=' px-2  w-fit h-fit !inline-flex items-center font-semibold' >{result}</p> :
    <div className='h-8 w-8 !p-0  aspect-square rounded-full flex items-center justify-center'>
       <img src={profilePic} className='h-full w-full rounded-full'/>
      </div> 
      }

    </div>
  )
})

export default Avatar

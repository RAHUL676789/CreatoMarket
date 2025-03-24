import React, { use, useEffect, useState } from 'react'
import HoverCard from '../components/HoverCard';
import Button from '../components/Button';
import { getToken } from '../helper/getToken';
import {useDispatch, useSelector} from "react-redux"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { getUserDetail } from '../helper/getUserDetail';
import {initUser} from "../features/user/userSlice"
import Avatar from '../components/Avatar';
const CreterHome = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [filter, setFilter] = useState(false);
  const [content, setContent] = useState(false);
  const [nav, setnav] = useState(false)
  const user = useSelector((state)=>state.user)
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const [updateFormData, setupdateFormData] = useState({
    username:user?.username,
    email:user?.email,
    
  })
  let token = getToken();
 
 async function hello (){

  try {
    let userdata  = await getUserDetail();
   
    if(userdata){
           dispatch(initUser(userdata))
    }
     

  } catch (error) {
    console.log(error)
  }
  }


  useEffect(()=>{
      if(token && user.id == ""){
       
       hello();
      }

      if(!token && user.id == ""){
        toast.error("youre not login please login")
        navigate("/login")
      }
  },[user.id]);

  return (
    <div className='h-[100vh] bg-gray-300  w-full flex relative '>

      <div
        className={`left  flex flex-col h-full ${isHovered ? 'w-48' : 'w-12'} bg-white transition-all duration-150`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="header px-2 py-2 flex justify-between mt-2  text-lg items-center ">
         <Avatar username={user?.username}/>
        {isHovered &&  <i class="fa-solid fa-pen-fancy cursor-pointer" title='edit'></i>}
        </div>
        <div className="profile-data w-full py-2 flex flex-col justify-start  items-center  text-[#051d51] bg-white flex-grow overflow-y-auto px-0 scrollbar-hidden gap-1">
          <div className='flex overflow-hidden   w-full  justify-start items-center  px-2 py-1 bg-white cursor-pointer m-0 hover:bg-gray-100 transition-all duration-100'>
            <i className="fa-solid fa-user h-8 w-8 text-center aspect-square p-1 border rounded-full justify-center items-center !inline-flex "></i>
            {isHovered && <span className="ml-1 font-light text-lg">{user?.username}</span>}
          </div>

          <div className=' cursor-pointer flex overflow-hidden bg-white w-full p-3 justify-start items-center  px-2 py-1 hover:bg-gray-100 transition-all duration-100'>
            <i className="fa-solid p-1 text-center h-8 w-8 fa-heart aspect-square rounded-full  justify-center items-center border !inline-flex"></i>
            {isHovered && <span className="font-light ml-1 text-lg">989</span>}
          </div>
          <div className='flex overflow-hidden bg-white w-full p-3 justify-start items-center  px-2 py-1  hover:bg-gray-100 transition-all duration-100 cursor-pointer'>
            <i className="fa-solid fa-wallet p-1 h-8 w-8 items-center justify-center  flex-col rounded-full aspect-square border !inline-flex"></i>
            {isHovered && <span className="font-light ml-1 text-lg"> <spna>&#8377;</spna>{user?.wallet}</span>}
          </div>
          <div className='flex overflow-hidden bg-white w-full p-3 justify-start items-center  px-2 py-1   hover:bg-gray-100 transition-all duration-100 cursor-pointer mt-auto' title='logout'>
            <i className="fa-solid fa-right-from-bracket itemen p-1 h-8 w-8 items-center justify-center  flex-col rounded-full aspect-square border !inline-flex"></i>
            {isHovered && <span className="font-light ml-1 text-lg"> <spna></spna>LogOut</span>}
          </div>
        </div>

        <div className="update-profile h-12 bg-gray-100 flex justify-start items-center p-3">
          <i onClick={() => setFilter(true)} className="fa-solid fa-pen cursor-pointer"></i>
        </div>
      </div>
      <div className="right h-full overflow-y-scroll scrollbar-hidden  w-full flex flex-wrap justify-center gap-3 bg-[#0e172b] ">

        <div className="header w-full h-fit justify-start gap-2  sm:h-16 bg-white  flex flex-wrap sm:justify-around p-2 items-center relative font-semibold ">


           <div

            className={`filter    border px-8 py-2  cursor-pointer ${nav ? "flex" :""} justify-center items-center rounded-[2px] hover:bg-gray-300 relative`} onClick={() => setContent(!content)}>
            <span className='font-light text-md ml-2'>Filter By</span>
            <i className="fa-solid font-light  fa-angle-down ml-1 text-slate-900"></i>
            {
              content && <div className="fil absolute bg-red  left-0 top-10 z-10 bg-white text-black px-2 py-4 font-light w-40   ">
                <ul className=''>
                  <li className='hover:bg-gray-200 px-2 py-1 cursor-pointer mt-1 w-full '>Ai-Content</li>
                  <li className='hover:bg-gray-200 px-2 py-1 cursor-pointer mt-1 w-full '>Image-Content</li>
                  <li className='hover:bg-gray-200 px-2 py-1 cursor-pointer mt-1 w-full '>Video-Content</li>
                  <li className='hover:bg-gray-200 px-2 py-1 cursor-pointer mt-1 w-full '>Text-Content</li>
                </ul>
              </div>
            }

          </div> 

          <div className="search hidden sm:block relative cursor-pointer">
            <input type="text"
              className=' outline-none bg-gray-200 px-8 py-2 rounded-xs '
              placeholder='Search' />
            <i className="fa-solid fa-magnifying-glass absolute right-0  h-full px-3  text-center !inline-flex justify-center items-center rounded-xs bg-gray-200 text-lg"></i>

          </div>

        <div className="new  border px-8 py-2 sm:flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <span className='mr-2'>Create-new</span>
            <i className="fa-solid fa-plus"></i>
          </div> 

        

        </div>
        <div className="contents">

          <HoverCard image={true} />

          <div className="videos">
            <HoverCard video={true} />
          </div>
          <div className="content">
            <HoverCard image={true} />
          </div>

        </div>
      </div>

      {/* edit profile modal */}
      {filter && <div className={`edit-modal 
      flex justify-center items-center
      
      absolute h-full w-full bg-gray-400 z-40 opacity-100 `}>

        <div className={`details flex  rounded-lg bg-slate-950 md:h-[80%] md:w-[80%]  w-full h-full !blur-0 mt-10   `}>
          <div className="left1 hidden   w-[40%] bg-slate-800 p-2 h-full sm:flex justify-center items-center flex-col gap-3 rounded-l-lg">
            <div className="greet">
              <h1 className='text-2xl text-white'>     Hi,Rahul Lodhi</h1>
            </div>
            <p className='text-gray-400 text-xs'>Please Check Your Details And Update</p>
            <Button content="Back" className="bg-white px-8 py-2" />

          </div>
          <form className='opacity-100  relative z-50 rounded-r-lg bg-white h-full w-full flex flex-col justify-center items-center gap-4' >
            <h1 className='mb-5 text-3xl font-bold'>Update-Details</h1>
            <div className="username relative w-[70%] flex items-center justify-center">
              <i className='fa-solid fa-user absolute left-0 text-[#0e172b] h-full px-3 !inline-flex items-center bg-gray-200'></i>
              <input type="text"
                className='outline-none flex flex-grow  px-6 py-2 bg-gray-200 w-[70%] ml-5'
                placeholder='update username' />


            </div>
            <div className="email relative w-[70%] flex items-center justify-center">
              <i className='fa-solid fa-envelope absolute left-0 px-3  text-[#0e172b] h-full !inline-flex items-center bg-gray-200 '></i>
              <input type="email"
                placeholder='update you email id'
                className='outline-none flex flex-grow ml-5 px-6 py-2 bg-gray-200 w-[70%]' />

            </div>
            <div className="password  relative w-[70%] flex items-center justify-center ">
              <i className='fa-solid fa-lock absolute left-0 px-3 h-full text-[#0e172b] !inline-flex items-center bg-gray-200'></i>
              <input type="password"
                placeholder='update password'
                className='outline-none  px-6 py-2 flex flex-grow ml-5 bg-gray-200 w-[70%]' />

            </div>

            <div className="buttons">
              <Button content="Update" className="bg-[#0e172b] px-8 py-2 text-white  font-bold mt-2" />
            </div>

            <div className="cross absolute right-3 cursor-pointer top-0">
              <i onClick={() => setFilter(false)} className="fa-solid fa-xmark hover:scale-110"></i>
            </div>
          </form>
        </div>

      </div>}

    </div>
  )
}

export default CreterHome

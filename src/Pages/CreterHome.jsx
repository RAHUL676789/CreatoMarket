import React, { useEffect, useState } from 'react'
import HoverCard from '../components/HoverCard';
import Button from '../components/Button';
import { getToken } from '../helper/getToken';
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { getUserDetail } from '../helper/getUserDetail';
import { initUser, newContent, updateContent } from "../features/user/userSlice"
import Avatar from '../components/Avatar';
import uploadFile from '../helper/uploadFile';
import { useForm } from "react-hook-form"
import Loader from '../components/Loader';



const CreterHome = () => {

  // create all neccessary state variable that may caouse to mount the page
  const URL = import.meta.env.VITE_API_URL;
  const [isHovered, setIsHovered] = useState(false);
  const [filter, setFilter] = useState(false);
  const [content, setContent] = useState(false);
  const [nav, setnav] = useState(false)
  const user = useSelector((state) => state.user)
  const [totalLikes, settotalLikes] = useState(user?.contents?.reduce((acc,curr)=>acc=curr.likes,0));
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [upPic, setUpPic] = useState(false);
  const [upload, setUpload] = useState(false);
  const [loader, setLoader] = useState(false);
  let [upformData, setUpFormData] = useState({})
  const [imageContent, setimageContent] = useState([]);
  const [videoContent, setvideoContent] = useState([]);
  const [rawContent, setrawContent] = useState([]);
  const [create, setCreate] = useState(false);
  const [pId, setpId] = useState("");

  const [contentUrl, setContentUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  // console.log(errors)

  const handleContentUrl = async (e) => {
    setLoader(true);
    try {
      const contentUrl = await uploadFile(e.target.files[0]);
      console.log(contentUrl);
      if (contentUrl.success) {
        setContentUrl(contentUrl);
        setpId(contentUrl.pId);
        setLoader(false);
      }else{
        toast.error(contentUrl?.errorMsg)
      }
    } catch (error) {
      console.log(error)
      setLoader(false);
      toast.error(error.message || "someting went wrong")
    }
  }

  // const wait = async()=>{
  //   return new Promise((res,rej)=>{
  //     setTimeout(()=>{
  //         res("succue");
  //     },5000)
  //   })
  // }


  const handleCreate = async (data) => {


    try {
      const response = await fetch(`${URL}/content/create`, {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data, url: contentUrl?.url, publicId: contentUrl?.pId })
      })

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        dispatch(newContent(result.data));
        setCreate(false);
        reset();
        setContentUrl(null);
      } else {
        toast.error(result.message);
        setCreate(false);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message || "someting went wrong")
    }
  }

  // accessign the token for user detaul
  let token = getToken();


  // function that create user if token exist and user filed gloabl state undefined

  async function hello() {

    try {
      let userdata = await getUserDetail();
      console.log(userdata)
      if (userdata) {
        dispatch(initUser(userdata))
        setimageContent((prev) => {
          return userdata?.contents?.filter((item) => item.type == "image")
        });
        setvideoContent((prev) => {
          return userdata?.contents?.filter((item) => item.type == "video")
        });
        setrawContent((prev) => {
          return userdata?.contetns?.filter((item) => item.type == "raw-content")
        });
      } else {
        navigate("/login")
      }


    } catch (error) {
      console.log(error)
      navigate("/login")
    }
  }


  // this is the useEffect that will run when the page is loaded and check if the user is logged in or not

  useEffect(() => {
    if (token && user.id == "") {

      hello();
    } else {
      setimageContent((prev) => {
        return user?.contents?.filter((item) => item.type == "image")
      });
      setvideoContent((prev) => {
        return user?.contents?.filter((item) => item.type == "video")
      });
      setrawContent((prev) => {
        return user?.contents?.filter((item) => item.type == "raw-content");
      })

      if (!token && user.id == "") {
        toast.error("youre not login please login")
        navigate("/login")
      }
    }
  }, [user]);



  // function for user update therir profile
  const handlUpdateProfileChange = async (e) => {
    try {
      setUpPic(true);
      let result = await uploadFile(e.target.files[0]);
      console.log(result);
      if (result) {
        setUpPic(false);
        // setUpload(true);
        setUpFormData((prev) => {
          return {
            ...prev,
            profilePic: result
          }
        })
        const upResult = await updateUser()
        if (upResult.success) {
          toast.success("profile picture updated")
        } else {
          toast.error("unable to update profile please try again");
        }
      }
    }
    catch (error) {
      console.log(error);
      setUpPic(false);
      toast.error(error.message || "failed to upload profile picture")
    }


  }


  // function for user if update their others informations
  const updateUser = async (e) => {

    if (Object.keys(upformData).length === 0) {
      alert("at least one filed is required");
      return;
    }
    try {
      setLoader(true);
      const response = await fetch(`${URL}/user/update`, {
        method: "put",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(upformData)
      })

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setUpPic(false);
        dispatch(initUser(result.data));
        setLoader(false);
        setUpFormData({});
        setFilter(false);
        return result;
      } else {
        toast.error(result.message);
        setLoader(false);
        return result;

      }
    } catch (e) {
      console.log(e);
      toast.error(e.message || "updation failed")
      setLoader(false);
      setUpFormData({})
    }


  }


  const handleUpInputChange = (e) => {
    setUpFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }



  const handleCancelContent = async()=>{
    console.log(pId);
    try {
      const response = await fetch(`${URL}/content/Cancel`,{
        method:"delete",
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({publicId:pId})
      })

      const result = await response.json();
      if(result.success){
        setCreate(false);
      }else{
        toast.error(result.message || "unable to cancel content please try again")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "someting went wrong")
      
    }
  }

  // alll ui component

  return (

    // parent div
    <div className='h-[100vh] bg-gray-300  w-full flex relative '>


      {/* this is our left part our or side panel */}
      <div
        className={`left  flex flex-col h-full ${isHovered ? 'w-48' : 'w-12'} bg-white transition-all duration-150`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="header px-2 py-2 flex justify-between mt-2  text-lg items-center ">
          <Avatar username={user?.username} profilePic={user?.profilePic} />
          {isHovered &&
            <label htmlFor="profile">
              <input type="file" id='profile' className='hidden'
                onChange={handlUpdateProfileChange} />
              {/* {upPic == false ? <i class="fa-solid fa-pen-fancy cursor-pointer" title='edit'></i> : <Button func={updateUser} content="Updating" loader={upload} className="bg-[#0e172b]" />} */}

              {upPic == true ? <Loader className="bg-[#0e172b]" /> : <div>
                <i className='fa-solid fa-pen-fancy '></i>
              </div>}
            </label>


          }
        </div>
        <div className="profile-data w-full py-2 flex flex-col justify-start  items-center  text-[#051d51] bg-white flex-grow overflow-y-auto px-0 scrollbar-hidden gap-1">
          <div className='flex overflow-hidden   w-full  justify-start items-center  px-2 py-1 bg-white cursor-pointer m-0 hover:bg-gray-100 transition-all duration-100'>
            <i className="fa-solid fa-user h-8 w-8 text-center aspect-square p-1 border rounded-full justify-center items-center !inline-flex "></i>
            {isHovered && <span title={user.username} className="ml-1 font-light text-lg line-clamp-1">{user?.username}</span>}
          </div>

          <div className=' cursor-pointer flex overflow-hidden bg-white w-full p-3 justify-start items-center  px-2 py-1 hover:bg-gray-100 transition-all duration-100'>
            <i className="fa-solid p-1 text-center h-8 w-8 fa-heart aspect-square rounded-full  justify-center items-center border !inline-flex"></i>
            {isHovered && <span className="font-light ml-1 text-lg">{totalLikes}</span>}
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

      {/* this is our right part of the page where we display all content and user info */}


      <div className="right h-full overflow-y-scroll scrollbar-hidden  w-full flex flex-wrap justify-center gap-3 bg-[#0e172b] ">


        {/* this is our header for right part */}


        <div className="header w-full h-fit justify-start gap-2  sm:h-16 bg-white  flex flex-wrap sm:justify-around p-2 items-center relative font-semibold ">


          <div

            className={`filter    border px-8 py-2  cursor-pointer ${nav ? "flex" : ""} justify-center items-center rounded-[2px] hover:bg-gray-300 relative`} onClick={() => setContent(!content)}>
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

          <div onClick={() => setCreate(true)} className="new  border px-8 py-2 sm:flex justify-center items-center hover:bg-gray-200 cursor-pointer">
            <span className='mr-2'>Create-new</span>
            <i className="fa-solid fa-plus"></i>
          </div>



        </div>

        {/* here listing all the content of the user what kind of content created by user or suugest to creatte */}
        <div className="contents">
          <div className='image'>
            <HoverCard type="image" image={true} cardData={imageContent} />
          </div>


          <div className="videos">
            <HoverCard type="video" video={true} cardData={videoContent} />
          </div>
          <div className="content">
            <HoverCard type="rawContent" textContent={true} cardData={rawContent} />
          </div>

        </div>
      </div>

      {/* edit profile modal */}


      {filter && <div className={`edit-modal 
      flex justify-center items-center
      
      absolute h-full w-full bg-gray-400 z-50 opacity-100 `}>

        <div className={`details flex  rounded-lg bg-slate-950 md:h-[80%] md:w-[80%]  w-full h-full !blur-0 mt-10   `}>
          <div className="left1 hidden   w-[40%] bg-slate-800 p-2 h-full sm:flex justify-center items-center flex-col gap-3 rounded-l-lg">
            <div className="greet">
              <h1 className='text-2xl text-white'>     Hi,Rahul Lodhi</h1>
            </div>
            <p className='text-gray-400 text-xs'>Please Check Your Details And Update</p>
            <Button content="Back" className="bg-white px-8 py-2" />

          </div>
          <form onSubmit={updateUser} className='opacity-100  relative z-50 rounded-r-lg bg-white h-full w-full flex flex-col justify-center items-center gap-4' >
            <h1 className='mb-5 text-3xl font-bold'>Update-Details</h1>
            <div className="username relative w-[70%] flex items-center justify-center">
              <i className='fa-solid fa-user absolute left-0 text-[#0e172b] h-full px-3 !inline-flex items-center bg-gray-200'></i>
              <input type="text"
                onChange={handleUpInputChange}

                name='username'
                className='outline-none flex flex-grow  px-6 py-2 bg-gray-200 w-[70%] ml-5'
                placeholder='update username' />


            </div>
            <div className="email relative w-[70%] flex items-center justify-center">
              <i className='fa-solid fa-envelope absolute left-0 px-3  text-[#0e172b] h-full !inline-flex items-center bg-gray-200 '></i>
              <input type="email"
                onChange={handleUpInputChange}
                name='email'
                placeholder='update you email id'
                className='outline-none flex flex-grow ml-5 px-6 py-2 bg-gray-200 w-[70%]' />

            </div>
            <div className="password  relative w-[70%] flex items-center justify-center ">
              <i className='fa-solid fa-lock absolute left-0 px-3 h-full text-[#0e172b] !inline-flex items-center bg-gray-200'></i>
              <input type="password"
                onChange={handleUpInputChange}
                placeholder='update password'
                className='outline-none  px-6 py-2 flex flex-grow ml-5 bg-gray-200 w-[70%]' />

            </div>

            <div className="buttons">
              <Button type='submit' content="Update" className="bg-[#0e172b] px-8 py-2 text-white  font-bold mt-2" loader={loader} />
            </div>

            <div className="cross absolute right-3 cursor-pointer top-0">
              <i onClick={() => setFilter(false)} className="fa-solid fa-xmark hover:scale-110"></i>
            </div>
          </form>
        </div>

      </div>}


      {/* here i am going to create a model where user can create new content that more infor */}

      {create && <div className="create w-full h-full bg-gray-600 absolute flex justify-center z-50 items-center">
        <div className="cross">
          <i onClick={() => setCreate(false)} className="fa-solid fa-xmark hover:scale-150 text-red-800  absolute right-3 top-6 cursor-pointer"></i>
        </div>
        <div className="create-content overflow-hidden w-full justify-center items-center flex flex-col bg-gray-300 h-[90%]">

          <div className="main flex flex-grow justify-center items-center overflow-hidden">
            <div className="left  overflow-scroll scrollbar-hidden py-2 h-[90%] bg-[#f2f3f6] flex-grow px-5  md:w-[70%]">

              <div className="header  h-12 flex justify-center items-center">
                <h1 className='text-3xl mb-2 text-[30e172b] font-bold'>Create - Content</h1>
              </div>
              <div className="details pl-4 ">
                <form onSubmit={handleSubmit(handleCreate)} className='flex flex-col   items-center justify-center gap-2 relative'>
                  <div className="field flex flex-col justify-center w-full md:w-[95%]  ">

                    <select
                      {...register("type", {
                        required: { value: true, message: "content-type is required field" }
                      })}
                      id="mySelect " className='p-2 border  bg-gray-100  outline-0'>
                      <option className='p-2' value="">Choose Content type</option>
                      <option className='p-2' value="image">Image</option>
                      <option className='p-2' value="video">Video</option>
                      <option className='p-2' value="raw-content">Raw-content</option>
                    </select>


                  </div>
                  {errors.type && <p className=' w-full text-red-600'>*{errors.type.message}</p>}
                  <div className=" relative w-[100%] md:w-[95%] flex items-center justify-center">
                    <label className='border absolute w-[20%] left-0 px-3  bg-[#dee2e6] h-full !inline-flex items-center text-black font-bold '>Title</label>
                    <input type="text"
                      {...register("title", {
                        required: { value: true, message: "title is required field" }
                      })}
                      name='title'
                      placeholder='Enter Title '
                      className="outline-none border w-full pl-24 pr-5 py-2 bg-gray-100" />



                  </div>
                  {errors.title && <p className='w-full text-red-600'>*{errors.title.message}</p>}

                  <div className="  relative w-[100%] md:w-[95%] flex items-center justify-center flex-col">
                    <label className=' border w-[20%] absolute left-0 px-2  bg-[#c6c8cc] h-full !inline-flex items-center text-black font-bold '>price</label>

                    <input type="number"
                      {...register("price", {
                        min: { value: 0, message: "price should be at least 1" }
                      })}
                      placeholder='Enter Title '
                      className="outline-none border w-full pl-24 pr-5 py-2 bg-gray-100" />
                    <div>


                    </div>



                  </div>
                  {errors.price && <p className='w-full text-red-600'> *{errors.price.message}</p>}
                  <div className="relative w-full md:w-[95%] flex items-center">
                    {/* File Label */}
                    <label htmlFor="file" className="w-[20%] absolute left-0 px-3 bg-[#c6c8cc] h-full flex border items-center text-black font-bold">
                      File
                    </label>

                    {/* File Input */}
                    <input
                      {...register("url", {
                        // required: {value:true, message:"file is required field"}
                      })}
                      onChange={handleContentUrl}
                      type="file"
                      id="file"
                      name="file"
                      className="outline-none border w-full pl-24 pr-5 py-2 bg-gray-100"
                    />

                  </div>
                  {errors.url && <p className='w-full text-red-600'>*{errors.url.message}</p>}
                  <div className=" relative w-[100%] md:w-[95%] flex items-center justify-center">

                    <textarea type="text"
                      
                      {...register("description")}
                      name='description'
                      placeholder='Write short description for content '
                      className='outline-none flex-grow border    px-16 py-2 bg-gray-100  ' />

                  </div>

                  <div className="buttons w-full flex gap-3">
                    <Button func={handleCancelContent} content="Cancel" type="button" className="bg-gray-600 px-7 py-2  text-white font-semibold" />
                    <Button content="Create" type="submit" className="bg-black text-white  flex-grow py-2" disabled={isSubmitting} loader={isSubmitting} />
                  </div>
                  {loader && <div className='absolute h-full w-full bg-gray-50 opacity-50'>
                    <Loader className="bg-[#0e172b] z-40 " />
                  </div>}
                </form>



              </div>


            </div>
            <div className="right hidden h-[90%]  w-[30%] bg-[#0e172b] md:flex flex-col justify-center items-center p-2  text-white gap-2">
              <h1 className='text-2xl'>Explore the Wordl</h1>
              <p className='opacity-70 -indent-3 ml-8'>Create Content with following detail</p>
              <Button content="Back" className="bg-white text-black px-8 py-2 font-bold" />


            </div>

          </div>
          <div className="bottom">

          </div>
        </div>
      </div>}

    </div>
  )
}

export default CreterHome

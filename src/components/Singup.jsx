import React ,{useEffect, useReducer, useRef, useState} from 'react'
import Button from './Button'
import Loader from './Loader'
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast'
import { useSelector,useDispatch } from 'react-redux'
import { initUser } from '../features/user/userSlice'


const Singup = () => {

    const [isLoading, setisLoading] = useState(false);
    const [otp, setOtp] = useState(false);
    const [otpValue,setOtpValue] = useState("");
    const [otpTimeLeft,setOtpTimeLeft] = useState(5 * 60);


    const timerRef = useRef(null);  // Persist across renders

    useEffect(() => {
       // Cleanup on unmount
    }, [otp]);
    
  
    const URL = import.meta.env.VITE_API_URL;
 
    console.log(URL)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting},

    } = useForm();



   
  
   
   
    const submit = async(data)=>{
        setisLoading(true);
        
      try{
        const response = await fetch(`${URL}/user/signup`,{
            method:"post",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        }) 

        const result = await response.json();
        console.log(result);
        if(result.success){
            toast.success(result.message);
            setisLoading(false)
            setOtp(true);
            timerRef.current = setInterval(() => {
                setOtpTimeLeft((prev) => {
                    if (prev <= 1) {
                        setOtp(false);
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        
          
           
        
        }else{
            toast.error(result.message);
            setisLoading(false)
        }
      }catch(e){
        console.log(e);
        setisLoading(false)
        toast.error(e.message || "user registraion fail please try again")
      }
           
    }

    const handleChangeType = ()=>{
        let password = document.querySelector(".password");
        password.type = "text";
        setTimeout(()=>{
           password.type = "password"
        },[500])
    }


 

    const verifyOtp = async ()=>{
        if(otpValue.trim() == "" && otpValue.length !== 6){
            alert("opt length is 6 ")
            return
        }

     

try {
    const response = await fetch(`${URL}/user/verify`,{
        method:"post",
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({code:otpValue})
       })

       const result = await response.json();
       console.log(result);
       if(result.success){
        toast.success(result.message);
        dispatch(initUser(result.data));
        navigate("/");
        setisLoading(false);
       }else{
        toast.error(result.message);
       }
} catch (error) {
    
}
    }
   
    return (
        <div className='h-[105vh] w-full bg-gray-300 flex  justify-center items-center flex-wrap py-2'>
            <div className=' font-bold   left  p-5    w-[300px] bg-[#0e172b] hidden lg:flex flex-col justify-center items-center rounded-l
           gap-1.5 h-[98%] '>
                <h1 className='text-3xl text-white'>WelCome</h1>
                <p className="pl-5 indent-[20px] font-light opacity-70  text-white">
                    To make connection with us please signup with person info
                </p>

                <Button func={()=>navigate("/logIn")} content="Login" className={"bg-white text-black px-8 py-2"}

                />

            </div>
            <div className='right h-[98%] w-[500px] bg-white rounded-r  flex flex-col justify-start items-center overflow-y-auto scrollbar-hidden py-2'>
                <h1 className='font-bold text-3xl mt-3'>Create An Account</h1>
                <div className="social-icon flex gap-2 mt-2">
                    <a className=' border rounded-full  h-[35px] w-[35px] flex justify-center items-center hover:bg-gray-800 hover:text-white transition-all duration-500'  ><i className="fa-brands fa-google-plus-g"></i></a>
                    <a className=' rounded-full border h-[35px] w-[35px] flex justify-center items-center hover:bg-gray-800 hover:text-white transition-all duration-500' href=""><i className="fa-brands fa-facebook-f"></i></a>
                    <a className=' rounded-full border h-[35px] w-[35px] flex justify-center items-center  hover:bg-gray-800 hover:text-white transition-all duration-500' href=""><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <p className='font-light mt-2'>or use your email for registraion</p>
                <div className='w-[90%] mt-2 min-h[100vh]'>
                    <form className='w-full flex flex-col justify-center items-center gap-2' onSubmit={handleSubmit(submit)}>
                        <div className="relative w-full max-w-sm">
                            <input
                                type="text"
                                placeholder="Enten full name"
                                className="w-full pl-10 pr-4 py-2 outline-0 bg-gray-100 font-bold "
                                {...register("username",{
                                    required:{value:true,message:"this is required field"},
                                    minLength:{value:3,message:"minimum length must be 3"}
                                })}
                            />
                           
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">

                                <i className="fa-solid fa-user"></i>
                            </div>
                        </div>
                        {errors.username && <p className='relative w-full  max-w-sm  px-2 text-red-700 '>{errors.username.message}</p>}
                        <div className="relative w-full max-w-sm">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="w-full pl-10 pr-4 py-2 outline-0 bg-gray-100 font-bold "
                                {...register("email",{
                                    required:{value:true,message:"this is required fiedl"},
                                    pattern:{  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message:"only gmail accounts are allowed"}
                                })}
                            />
                             
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                        </div>
                        {errors.email && <p className='relative w-full  max-w-sm  px-2 text-red-700'>{errors.email.message}</p>}
                        <div className="relative w-full max-w-sm  ">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="w-full pl-10 pr-4 py-2 outline-0 bg-gray-100 font-bold password "
                                {...register("password",{
                                    required:{value:true,message:"password is required"},
                                    minLength:{value:6,message:"password min length is 6"}
                                })}
                            />
                              
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">

                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <div className='text-gray-800 absolute left-[94%] -translate-y-1/2 top-1/2
                            cursor-pointer ' 
                            onClick={handleChangeType}>
                                <i className="fa-regular fa-eye"></i>
                            </div>
                        </div>
                        {errors.password && <p className='relative w-full  max-w-sm  px-2 text-red-700'>{errors.password.message}</p>}

                         
                      
                       

                       { otp && <div className="relative w-full max-w-sm">
                            <input
                                type="text"
                                placeholder="Enter otp"
                                className="w-full  pr-4 py-2 outline-0 bg-gray-100 font-bold text-green-800 pl-12"
                                value={otpValue}
                                onChange={(e)=>setOtpValue(e.target.value)}
                             
                            />

                     {otpTimeLeft > 0 &&  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 ml-2  h-full justify-center items-center flex text-sm p-1.5 ">
                                <p className='text-red-700'>{Math.floor(otpTimeLeft/60)}:{Math.floor(otpTimeLeft%60)}</p>
                            </div> }
                             
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800">
                              <Button content="Verify" className="bg-green-700 px-4 py-2 font-bold text-white" loader={isLoading} disabled={isLoading} type="button" func={verifyOtp}/>
                            </div>
                        </div>}

                        {!otp && <div>
                            <Button content="Send Otp" className={"text-white bg-[#0e172b] px-8 py-2"} disabled={isSubmitting} loader={isLoading}/>
                        </div>}

                    </form>
                    <div className="navigate block md:hidden">
                        <p  onClick = {()=>navigate("/login")}className='text-blue-400 cursor-pointer'>already have an account?login</p>
                    </div>
                </div>


            </div>

          
        </div>

    )
}

export default Singup

import React ,{useState} from 'react'
import Button from './Button'
import Loader from './Loader'
import {useForm} from "react-hook-form"


const Login = () => {
      const [isLoading, setisLoading] = useState(false);
    
        const {
            register,
            handleSubmit,
            formState:{errors},
    
        } = useForm();
    
        const submit = (data)=>{
                console.log(data);
        }
    
        const handleChangeType = ()=>{
            let password = document.querySelector(".password");
            password.type = "text";
            setTimeout(()=>{
               password.type = "password"
            },[500])
        }
  return (
    <div className='h-[105vh] w-full bg-gray-300 flex  justify-center items-center flex-wrap py-2'>
    <div className=' font-bold  justify-center items-center left  p-5    w-[300px] text-[#0e172b]  bg-white hidden lg:flex flex-col justify-center items-center rounded-l
   gap-1.5 h-[98%] '>
        <h1 className='text-3xl'>WelCome Back</h1>
        <p className="pl-5 indent-[20px] font-light opacity-70 ">
            To Keep connection with us please Login with person info
        </p>

        <Button content="Signup" className={" text-white bg-[#0e172b] font-bold"}

        />

    </div>
    <div className='right h-[98%] w-[500px] bg-[#0e172b] tex-white rounded-r  flex flex-col justify-start items-center overflow-y-auto scrollbar-hidden py-2'>
        <h1 className='font-bold text-3xl mt-3 text-white'>Login</h1>
        <div className="social-icon flex gap-2 mt-2">
            <a className=' border border border-white bg-white rounded-full  h-[35px] w-[35px] flex justify-center items-center hover:bg-gray-800 hover:text-white transition-all duration-500'  ><i className="fa-brands fa-google-plus-g"></i></a>
            <a className=' rounded-full border h-[35px] w-[35px] flex justify-center   items-center bg-white  hover:bg-gray-800 hover:text-white transition-all duration-500' href=""><i className="fa-brands fa-facebook-f"></i></a>
            <a className=' rounded-full border h-[35px] w-[35px] flex justify-center items-center bg-white  hover:bg-gray-800 hover:text-white transition-all duration-500' href=""><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <p className='font-light mt-2 text-white'>or use your email and password login</p>
        <div className='w-[90%] mt-2 min-h[100vh]'>
            <form className='w-full flex flex-col justify-center items-center gap-6' onSubmit={handleSubmit(submit)}>
               
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

                <div>
                    <Button content="signup" className={"text-[#0e173b] font-bold bg-white"} />
                </div>

            </form>
        </div>


    </div>

    {/* <Loader/> */}
</div>
  )
}

export default Login

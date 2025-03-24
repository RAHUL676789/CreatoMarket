import toast from "react-hot-toast";


export const getUserDetail = async()=>{
    console.log("userdata");
    let URL = import.meta.env.VITE_API_URL;
    try {
         const response = await fetch(`${URL}/user/profile`,{
            method:"get",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            }
         })
         const result = await response.json();
         console.log(result);
       if(result.success) return result.data;
       return null;
    } catch (error) {
        console.log(error);
        toast.error(error.message || "someting went wrong")
    }
}
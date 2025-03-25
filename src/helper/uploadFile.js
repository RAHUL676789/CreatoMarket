
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
console.log("this is cloudname",cloudName);

const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;


const uploadFile=async(file)=>{

    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','chat-app-file');
    const response = await fetch(url,{
        method:"post",
        body:formData
    })

    const rdata = await response.json();
  
   return rdata.url;
}

export default uploadFile;
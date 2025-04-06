
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
console.log("this is cloudname",cloudName);

const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;


const uploadFile=async(file)=>{

   try{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','creatoMarket');
    const response = await fetch(url,{
        method:"post",
        body:formData
    })
  
    const rdata = await response.json();
   console.log(rdata);
   return {
    url:rdata.url,
    pId:rdata.public_id,
    success:true
   };
   }catch(e){
   console.log(e);
   return {errorMsg:"failed to upload please try agina",success:false};
   }
}

export default uploadFile;
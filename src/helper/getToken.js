


// let token = null;

export const getToken = ()=>{
   let resultCookie = document.cookie.split("; ");
 

   for(let cook of resultCookie){
         
        const [name,value] = cook.split("=");
      
        if(name === 'token'){
          return value;
        }
   }
 

  return null;
  
}
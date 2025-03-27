import { useRef } from "react";

let timeRef;



export const debounceFunc = (func,time)=>{
    if(timeRef){
        clearInterval(timeRef);
    }
    timeRef=setTimeout(()=>{
          func();
    },time)
}
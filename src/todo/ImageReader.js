import React from 'react'
import "../todo/todo.css"
import { ImCross } from "react-icons/im";

const ImageReader = ({ val, setShowPop }) => {
    
  return (
   <>
    <div className='modalBackground'>
    <div className='modalContainer'>
        <button className='btn btn-outline-danger' style={{width:"50px"}} onClick={()=>setShowPop(false)}><ImCross /></button>
       <img src={val} style={{width:"800px", height:"500px", marginTop:"30px", marginLeft:"20px"}} /> 
    </div>
</div>
   
   </>
  )
}

export default ImageReader

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showItems,deleteItems } from '../features/todoApi'
import ReactLoading from 'react-loading';
import ImageReader from './ImageReader';
// import { FaEdit } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';

const Display = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPopUp,setShowPop] = useState(false)
  const [data, setData] = useState("")


  useEffect(()=>{
    dispatch(showItems())
  },[])

  const  { todos ,loading } = useSelector((state)=>{
    return state.list
  })

  if(todos){
    if(loading){
      return  <ReactLoading type={"spin"} color={"blue"} height={400} width={250} />
    }
  }else if(!todos || todos.length <= 0){
    return <div>
       <h1>No data available</h1> 
       <button className="btn btn-outline-secondary"
    style={{marginLeft:"10px", marginTop:"17px"}}
     type="button" id="button-addon2" 
   onClick={()=>navigate("/todo")}>Back</button>
    </div>
  }



  return (  
   <>
   {showPopUp && <ImageReader val={data} showPopUp={showPopUp} setShowPop={setShowPop} /> } 
   <div className='abc'>
        <h1>Your Lists</h1>

        {
          todos.map((item)=>{
            return(
              <>
             <div className='lists' key={item.id}>
              <p>Id: {item.id}</p>
              <p>Todo: {item.todo}</p>
              <p>Date: {item.date}</p>
              <img src={item.URL} style={{width:"150px", height:"150px", marginTop:"30px"}} onClick={()=>[setData(item.URL),setShowPop(true)]} />
              </div>
              </>
            )
          })
        }
         <button className="btn btn-outline-secondary mt-5"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={()=>navigate("/todo")}>Back</button>
      </div>
   </>
  )
}

export default Display

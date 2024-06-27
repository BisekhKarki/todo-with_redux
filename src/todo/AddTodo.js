import React, { useState } from 'react'
import "../todo/todo.css"
import { useDispatch } from 'react-redux'
import { imageDb } from '../firebase/firebaseConfig'
import { ref } from 'firebase/storage'
import { getDownloadURL, listAll, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid"
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createItems } from '../features/todoApi'

const AddTodo = () => {

    const nav = useNavigate()
    const [todo,setTodo] = useState("")
    const [date,setdate] = useState("")
    const [img,setImg] = useState(null)
    const [url,setUrl] = useState([])
    const dispatch = useDispatch()
  
    const uploadImage = async ()=>{
      const imgRef = ref(imageDb, `files/${v4()}`)
      await uploadBytes(imgRef,img)
      listAll(ref(imageDb,"files")).then((img)=>
        img.items.forEach((val)=>{
          getDownloadURL(val).then((url)=>{  
            setUrl(url)
          })
        })
        )
    }

    const notify = async () => {
      await uploadImage()
      dispatch(createItems({ URL:url, date:date, todo:todo  }))
        return  toast.success('Item Added successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
    }

  return (
   <>
    <div>
    <ToastContainer limit={1} />
      <div className='values'>
       <div className='todo'>
      <h1>Add activities to the list</h1>
      <div class="input-group">
        <span class="input-group-text">Select the date</span>
        <input type="date" aria-label="Enter date" className="form-control"
        value={date} onChange={(e)=>setdate(e.target.value)}
        />
    </div>
    <div class="input-group mt-3">
      <span class="input-group-text">Enter the Activity</span>
      <input type="text" aria-label="First name" className="form-control"
      value={todo} onChange={(e)=>setTodo(e.target.value)}
      />
    </div>
    <div class="input-group mt-3">
      <span class="input-group-text">Upload Image</span>
      <input type="file"  className="form-control"
      onChange={(e)=>setImg(e.target.files[0])}
      />
    </div>
    <button className="btn btn-outline-secondary" style={{marginLeft:"10px", marginTop:"17px"}} type="button" id="button-addon2" 
      onClick={notify}>Add Item</button>
      <button className="btn btn-outline-secondary" style={{marginLeft:"10px", marginTop:"17px"}} type="button" id="button-addon2" 
      onClick={()=>nav("/todo")}>Back</button>
    </div>
    </div>
    </div>
   </>
  )
}

export default AddTodo

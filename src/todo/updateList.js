import React,  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { editItems } from '../features/todoApi';
import { imageDb } from '../firebase/firebaseConfig'
import { ref } from 'firebase/storage'
import { getDownloadURL, listAll, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid"


const UpdateTodo = () => {

    const navigate = useNavigate()
    const [todo,setTodo] = useState("")
    const [date,setdate] = useState("")
    const [id,setId] = useState("")
    const [img,setImg] = useState(null)
    const [url,setUrl] = useState([])

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

    const dispatch = useDispatch()


    const notify = async () => {
      await uploadImage()
      dispatch(editItems({ id:id, date:date, todo:todo, URL:url  }))
        return  toast.success('Item updated successfully', {
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
    <h1>Update List</h1>
            <ToastContainer limit={1} />
    <div>
        <div className='values'>
        <div className='todo'>
        <h1>Enter Details</h1>
        <div class="input-group mb-3">
            <span className="input-group-text">Enter the ID</span>
            <input type="text" aria-label="Enter date" className="form-control"
            value={id} onChange={(e)=>setId(e.target.value)}
            />
    </div>
        <div class="input-group">
            <span className="input-group-text">Select the date</span>
            <input type="date" aria-label="Enter date" className="form-control"
            value={date} onChange={(e)=>setdate(e.target.value)}
            />
    </div>
    <div class="input-group mt-3">
        <span className="input-group-text">Enter the Activity</span>
        <input type="text" aria-label="First name" className="form-control"
        value={todo} onChange={(e)=>setTodo(e.target.value)}
        />
    </div>
    <div class="input-group mt-3">
        <span className="input-group-text">Upload Image</span>
        <input type="file"  className="form-control"
          onChange={(e)=>setImg(e.target.files[0])}
        />
    </div>
    
    </div>
    </div>
    </div>
    <div>
    <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={notify}> 
        Update Item
    </button>
      <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={()=>navigate("/todo")}>
        Back
    </button>
    
    </div>
    
    </>
  )
}

export default UpdateTodo

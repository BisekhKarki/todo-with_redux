import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../todo/todo.css"
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { deleteItems } from '../features/todoApi';


const DeleteTodo = () => {
    const navigate = useNavigate()
    const [id, setId] = useState("")
    const dispatch = useDispatch();

    

    const notify = () => {
        
        dispatch(deleteItems({id:id}))
        return  toast.success('Item deleted successfully', {
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
        <h1>Delete Items</h1>
    <div className='deleting'>
    <span className="input-group-text">Enter ID</span>
    <input type="text" aria-label="Enter ID" className="form-control"
        value={id} onChange={(e)=>setId(e.target.value)}
    />      
    
    </div>
    <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={notify}>Delete</button> 
      <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={()=>navigate("/todo")}>Back</button>
    </div>
    
   </>
  )
}

export default DeleteTodo

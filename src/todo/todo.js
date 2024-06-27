import React  from 'react'
import "../todo/todo.css"
import { useNavigate } from 'react-router-dom'
import { authenticated } from '../firebase/firebaseConfig'

const Todo = () => {

  const navigate = useNavigate()

  const handleLogout = async ()=>{
    try{
      await authenticated.signOut()
      window.location.href = "/"
    }catch(e){
      console.log(e)
    }
  }


  

  return (
    <>

      <h1>Todo List Application</h1>
      <button className="btn btn-outline-secondary mt-3"
       type="button"
        id="button-addon2" 
        onClick={()=>navigate("/add")}
        >Add List</button>

      <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={()=>navigate("/display")}>Show List</button>

      <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
      onClick={()=>navigate("/update")}>Update Todo</button>

      <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}}
        type="button" id="button-addon2" 
        onClick={()=>navigate("/delete")}>Delete Todo</button>

      <button className="btn btn-outline-secondary"
       style={{marginLeft:"10px", marginTop:"17px"}} 
       type="button"
       id="button-addon2" 
       onClick={handleLogout}>Logout</button>
      

    </>

  )
}

export default Todo

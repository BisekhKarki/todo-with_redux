import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './loginSignup/Login';
import SignUp from './loginSignup/Signup';
import Todo from './todo/todo';
import { useEffect, useState } from 'react';
import { authenticated } from './firebase/firebaseConfig';
import AddTodo from './todo/AddTodo';
import Display from './todo/Display';
import DeleteTodo from './todo/DeleteTodo';
import UpdateTodo from './todo/updateList';

function App() {

  const [user,setUser] = useState();

  useEffect(()=>{
    authenticated.onAuthStateChanged((use)=>{
      setUser(use)
    })
  }, [])

  return (
    <div className="">
        <Router>
          <Routes>
            <Route path='/' element={ user ? <Navigate to={"/todo"} /> : <Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/todo' element={<Todo />} />
            <Route path='/add' element={<AddTodo />} />
            <Route path='/display' element={<Display />}  />
            <Route path='/update' element={<UpdateTodo />}  />
            <Route path='/delete' element={<DeleteTodo />}  />
          </Routes>
        </Router>
    </div>
  );
}

export default App;


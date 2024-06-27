import React, { useState } from 'react';
import './Login.css';  // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authenticated } from '../firebase/firebaseConfig';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleRegister = async ()=>{
        try{
           await signInWithEmailAndPassword(authenticated, email,pass)
           window.location.href="/todo";
           const user = authenticated.currentUser
           console.log(user)
        }catch(e){
            console.log(e)
        }
    }

    const loggedIn = async (e) => {
        e.preventDefault();
       
        try {
            const dbref = collection(db, "register");
            const emailQuery = query(dbref, where('Email', '==', email));
            const emailSnapshot = await getDocs(emailQuery);

            let userFound = false;

            emailSnapshot.forEach((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    if (userData.Password === pass) {
                        userFound = true;
                    }
                }
            });

            if (userFound === true) {
                toast.success('Account LoggedIn successfully', {
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
               await handleRegister()
               
                navigate("/todo");
                
            } else {
                toast.error('Incorrect email or password', {
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
        } catch (error) {
            console.error("Error logging in: ", error);
            toast.error("An error occurred while logging in. Please try again.", {
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
    };

    return (
        <>
            <h1>Welcome to the Login Page</h1>
            <ToastContainer limit={1} />
            <form onSubmit={loggedIn}>
                <div className="mb-3 mt-4 width-50px">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <div className="mb-3 form-check">
                    <p className="form-check-label">Account not created? <Link to={"/signup"}>SignUp</Link></p>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default Login;

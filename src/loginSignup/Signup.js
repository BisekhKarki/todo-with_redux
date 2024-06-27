import React, { useState } from 'react';
import './Signup.css';  // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/register';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authenticated } from '../firebase/firebaseConfig';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const connect = collection(db, "register");
    const dispatch = useDispatch();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(authenticated, email, password);
            const user = authenticated.currentUser;
            console.log(user);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleRegister();
        toast.success('Account registered successfully', {
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
        dispatch(addUser({ email, age, password, phone }));
        await addDoc(connect, { Phone: phone, Password: password, Age: age, Email: email });

        setEmail("");
        setAge("");
        setPassword("");
        setPhone("");
        navigate("/");
    };

    return (
        <>
            <h1>Welcome to the Sign-Up Page</h1>
            <ToastContainer limit={1} />
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        type="number"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <p className="form-check-label">Account already created? <Link to="/">Login</Link> </p>
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default SignUp;

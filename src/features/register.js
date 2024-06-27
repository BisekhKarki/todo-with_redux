import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase/firebaseConfig';
import {  addDoc, collection } from 'firebase/firestore';

const initialState = {
    userData: [{email:"bisekhkarki17@gmail.com",age:"21",password:"bisekh@123",phone:"9876543210"}]
}

const connect = collection(db,"register")
const storeUser = async (age,email,password,phone)=>{
    await addDoc(connect,{Phone:phone,Password:password,Age:age,Email:email})
}

export const registerUser = createSlice({
    name:"signup",
    initialState,
    reducers:{
        addUser: (state,action)=>{
            const user = {
                email: action.payload.email,
                age:action.payload.age,
                password:action.payload.password,
                phone:action.payload.phone
            }
            state.userData.push(user)
            storeUser(user.age,user.email,user.password,user.phone)
        }
    }
})


export const { addUser } = registerUser.actions
export default registerUser.reducer
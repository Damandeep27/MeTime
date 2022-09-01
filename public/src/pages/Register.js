import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios  from'axios';
import {registerRoute} from '../utils/Routes'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../assets/logo.png';
import pink from'../assets/bg.png';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SKIN_TONE_DARK } from 'emoji-picker-react';



const Register = (props) => {
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"colored"

    }
    const navigate=useNavigate();
    const [values, setValues]=useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }
    const handleValidation=()=>{
        const {userName,email, password,confirmPassword}=values;
        if (password!==confirmPassword){
            toast.error("Password and confirm password should be same",toastOptions);
            return false;
        }else if(userName.length<3){
            toast.error("userName cannot be less than three characters.",toastOptions);
            return false;
        }else if(password.length<8){
            toast.error("Password length should be equal or greater than 8 characters",toastOptions);
            return false;
        }else if(email===""){
            toast.error("Email is required",toastOptions);
            return false;
        }
        return true;
    }
    const handlesubmit = async (event) =>{
        event.preventDefault();
        const {userName,email, password}=values;

        if(handleValidation()){
           const {data}= await axios.post(registerRoute,{userName,email,password});
           if(data.status===false){
            toast.error(data.msg,toastOptions);
           }
           if(data.status===true){
            localStorage.setItem("me-time-user", JSON.stringify(data.user));
           
            navigate('/');
           }

           
        }

    }

    return (
        
        <>
        <FormContainer>
        <form onSubmit={event=>handlesubmit(event)}>
            <div className="brand">
                <img src={img} alt="logo"/>
                <h1>Me Time</h1>
            </div>
            <input type="text" name="userName" placeholder='Username' onChange={(e)=>handleChange(e)}/>
            <input type="email" name="email" placeholder='Email' onChange={(e)=>handleChange(e)}/>
            <input type="password" name="password" placeholder='Password' onChange={(e)=>handleChange(e)}/>
            <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={(e)=>handleChange(e)}/>
            <button type="submit">Register</button>
            <span>Already registered an account? <Link to='/login'>Login </Link></span>
        </form>
        </FormContainer>
       <StyledContainer />
        </>
        
        
    );
};

export default Register;

const FormContainer=styled.div`
height:100vh;
width:100vw;
display:flex;
background-image:url(${pink});
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#3b0018;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}

form{
    display:flex;
    flex-direction:column;
    background-color:#00000060;
    gap:2rem;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #ff0e6e;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #f07aab;
            outline:none;

        }
    }
    button{
        background-color:#f07aab;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
            background-color:#ff0e6e;
        }

    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#ff0e6e;
            text-decoration:none;
            font-weight:bold;
        }
    }
}


`;

const StyledContainer = styled(ToastContainer)`
  
.Toastify__toast--error {
    background: #ff0e6e;
}
`;
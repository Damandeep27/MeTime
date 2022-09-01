import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import {BiPowerOff} from 'react-icons/bi';

function Logout(props) {
    const navigate=useNavigate();
    const handleClick=async()=>{
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
            <p>Logout</p>
           
        </Button>
    );
}

export default Logout;

const Button=styled.button`
display:flex;
justify-items:center;
align-items:center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#f07aab;
border:none;
cursor:pointer;
svg{
    font-size:1.3rem;
    color:#ebe7ff
}
p{
    color:white;
    font-size:1rem;
    padding:0.4rem;
}

`;
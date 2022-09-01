import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import {BiPowerOff} from 'react-icons/bi';
import {IoIosContacts} from 'react-icons/io';

function ContactButton({showHideContacts}) {
    const navigate=useNavigate();

    return (
        <Button onClick={showHideContacts}>
           <IoIosContacts />
            <p>Contacts</p>
           
        </Button>
    );
}

export default ContactButton;

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
import React from 'react';
import styled from 'styled-components';
import hello from "../assets/hello.gif"


function Welcome({user}) {
    return (
        <Container>
            <img src={hello} alt="hello" />
            <h1>Welcome,<span>{user.userName}!</span></h1>
            <h3>Please select a contact to Start Messaging.</h3>
        </Container>

    );
}

export default Welcome;

const Container=styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
background-color:#f07aab;
height:100%;
width:100%;
margin:0;
img{
    height:20rem;

}
span{
    color:#ff0e6e;
}
`
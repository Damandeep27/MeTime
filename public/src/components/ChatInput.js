import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from"react-icons/bs";

function ChatInput({handleSendMessage}) {
    const[showEmojis, setShowEmojis]=useState(false);
    const [msg, setMsg]=useState('');
    

    const handleEmojisHideShow=()=>{
        setShowEmojis(!showEmojis);

    }
    const handleEmojiClick=(event,emoji)=>{
        
        let message=msg;
        message+=emoji.emoji;
        setMsg(message);
        
    }

    const sendChat=(event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMessage(msg);
            setMsg('');
        }
    }
    return (
        <Container>
            <div className='="button-container'>
                <div className='emoji'>
                    <BsEmojiSmileFill onClick={handleEmojisHideShow}/>
                    {showEmojis&&<Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className='send'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

export default ChatInput;
const Container=styled.div`
display:grid;

grid-template-columns:5% 95%;
align-items:center;
background-color:#ff0e6e;
padding:0.5rem 2rem;
padding-bottom:0.3rem;
.button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
   
}
.emoji{
    position:relative;
      
}

aside.emoji-picker-react{
    position:absolute;
    top:-350px;
    background-color:#ff0e6e;
    box-shadow:0 5px 10px #f07aab;
    border-color: white;
    .emoji-categories{
        display:none;
    }
    .emoji-search{
        margin-top:0.5rem;
        background-color:transparent;
        border-color:white;
        color:white;
    }
    .emoji-group:before{
        background-color:#ff0e6e;
        color:white;
    }
    .emoji-scroll-wrapper::-webkit-scrollbar{
        background-color:#ff0e6e;
        width:5px;
        &-thumb{
            background-color:white;
        }

    }
}

.emoji svg{
    font-size: 1.5rem;
    color:#ffff00c8;
    cursor:pointer;
}
.input-container{
    width:100%;
    display:flex;
    gap:1rem;
    align-content:center;
    input{
        border-radius:2rem;
        width:90%;
        color:#6e0236;
        border:none;
        padding-left:1rem;
        font-size:1.2rem;
        &::selection{
            background-color:#9186f3;
        }
        &:focus{
            outline:none;
        }
        
    }
    button{
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#f07aab;
        border:none;
        svg{
            font-size:2rem;
            color:white;
        }

    }
}


`;
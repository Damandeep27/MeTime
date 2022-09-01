import React from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import axios from 'axios';
import {v4 as uuidv4} from "uuid";
import {useState,useEffect} from "react";
import {getAllMessageRoute, sendMessageRoute} from '../utils/Routes'
import {useRef} from "react";

function ChatContainer({currentChat, currentUser,socket}) {
    const [messages,setMessages]=useState([]);
    const [arrivalMessages, setArrivalMessages]=useState(null);
    const scrollRef=useRef();

    
    const handleSendMessage=async(msg)=>{
        const data= await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg
        });
      
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg
        })
        const msgs=[...messages];
        msgs.push({fromSelf:true,message:msg});
        setMessages(msgs);
        
    }

    useEffect(()=>{
        if(socket.current){
            
            socket.current.on("msg-recieve",(msg)=>{
               setArrivalMessages({fromSelf:false,message:msg})
            })
       }
    },[])

    useEffect(()=>{
        arrivalMessages&& setMessages((prev)=>[...prev,arrivalMessages])
       
    },[arrivalMessages])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
       
    },[messages])
    

    useEffect(()=>{

       
        if(currentChat){
            async function fetchData() {
            
                const res=await axios.post(getAllMessageRoute,{
                    from:currentUser._id,
                    to:currentChat._id
                })
                setMessages(res.data);
                
                
             
            }
            
           fetchData();

        }
        

       
    },[currentChat])


    return (
        <>
        {currentChat&&(
             <Container>
             <div className="chat-header">
                 <div className='user-details'>
                     <div className='avatar'>
                     <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt="avatar" />
                     </div>
                     <div className='username'>
                         <h3>{currentChat.userName}</h3>
                     </div>
                 </div>
 
             </div>
             <div className='chat-messages'>
                {
                    messages.map((message,index)=>{
                        return(
                            <div ref={scrollRef} key={index}>
                                <div className={`message ${message.fromSelf ?"sended":"recieved"}`}>
                                    <div className='content'>
                                        <p>
                                        {message.message}
                                        </p>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }

             </div>
             <ChatInput handleSendMessage={handleSendMessage}/>
         </Container>
        )}
        </>
       
    );
}

export default ChatContainer;
const Container=styled.div`
display:grid;
grid-template-rows: 15% 70% 15%;
overflow:hidden;
height:100%;
width:100%;
background-color:#f07aab;

.chat-header{
    display:flex;
    justify-content:space-between;
    background-color:#ff0e6e;
    align-items:center;
    padding:1rem;
    .user-details{
        display:flex;
        align-items:center;
        gap:1rem;
    }
    .avatar{
        img{
            height:3rem;
        }
    }
    .username{
        h3{
            color:white;
        }
    }

    

}

.chat-messages{
    min-height:70%;
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    .message{
        display:flex;
        align-items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.1rem;
            border-radius:1rem;
            color:#d1d1d1;


        }
    }

}
.sended{
    justify-content:flex-end;
    .content{
        background-color:#ff0468;
    }
}
.recieved{
    justify-content:flex-start;
    .content{
        background-color:#ff007b90;
    }
}

@media screeen and (min-width:720px) and (max-width:1080px){
    grid-template-rows:14% 70% 15%;
}

`;
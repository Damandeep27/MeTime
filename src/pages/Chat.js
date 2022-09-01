import React from 'react';
import styled from 'styled-components';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/Routes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";
import { useRef } from 'react';
import {host} from '../utils/Routes'
import ChatHeader from '../components/ChatHeader';


const Chat = () => {
    const socket=useRef();
    const [contacts, setContacts]=useState([]);
    const[showContacts, setShowContacts]=useState(false);
    const navigate=useNavigate();
    const[currentUser, setCurrentUser]=useState(undefined);
    const[currentChat,setCurrentChat]=useState(undefined);
    const[isLoaded, setIsLoaded]=useState(false);

    useEffect(()=>{
        if(currentUser){
            socket.current=io(host, {transports: ['websocket', 'polling', 'flashsocket']});
            console.log(currentUser._id);
            socket.current.emit("add-user",currentUser._id);

        }
    },[currentUser]);

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('me-time-user'));
        if(!user){
            navigate('/login');
        }else{
            setCurrentUser(user);
            setIsLoaded(true);
        }
    },[]);
    useEffect(()=>{
        async function fetchData() {
            
            if(currentUser){
                if(currentUser.hasAvatar){
                    const {data}=await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data);
                }else{
                    navigate('./setAvatar')
                }
            }
            
         
        }
        
       fetchData();
       
        

    },[currentUser]);

    const handleChatChange=(chat)=>{
        setCurrentChat(chat);
    };

    const showHideContacts=()=>{
        setShowContacts(!showContacts);
    }
    
    

   
    return (
        <Container>
                {currentUser? 
                <>
                <ChatHeader showHideContacts={showHideContacts} currentUser={currentUser} />
                <div className="display">
                <Contacts showContacts={showContacts} currentUser={currentUser} contacts={contacts} changeChat={handleChatChange} />
                {
                    (currentChat===undefined && isLoaded)?
                    <Welcome user={currentUser} />
                    :
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>

                }
                </div>
                </>
                :
                <div></div>


                }

             
                
                
               
        </Container>
    );
};

const Container=styled.div`
    background-color:#3b0018;
    height:100vh;
    width:100vw;
    display:flex;
    overflow:hidden;
    flex-direction:column;
    padding:1.5rem;
    margin:0;
    align-items: center;
    justify-content:center;
    .display{
        width:80%;
        height:70%;
        display:flex;
    }
  
`;

export default Chat;

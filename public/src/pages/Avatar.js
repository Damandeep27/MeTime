import React from 'react';
import { useState,useEffect } from 'react';
import axios  from'axios';
import { Buffer } from 'buffer';
import {setAvatarRoute} from '../utils/Routes'
import { useNavigate } from 'react-router-dom';
import img from '../assets/logo.png';
import {ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';


function Avatar(props) {
    const api=`https://api.multiavatar.com`
    const[isLoading, setIsLoading]=useState(true);
    const[avatars,setAvatars]=useState([]);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);
    const navigate=useNavigate();
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"colored"

    }
    useEffect(()=>{
        if(!localStorage.getItem('me-time-user')){
            navigate('/login');
        }
    },[]);

    useEffect(()=>{
        
        async function fetchData() {
            const data=[];
            for(let i=0;i<12;i++){
                const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}?apikey=LAFljmPEQ4zkue`);
                const buffer= new Buffer(image.data);
                data.push(buffer.toString("base64"));
                
          }
          setAvatars(data);
          setIsLoading(false);
         
        }
        
       fetchData();
        
    },[])


    const setProfilePicture=async()=>{

       
        if(selectedAvatar==undefined){
            toast.error("Please select an avatar",toastOptions);
        }else{
            const user= await JSON.parse(localStorage.getItem('me-time-user'));
            const {data}= await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar]
            })
           

            if(data.isSet){
                user.hasAvatar=true;
                user.avatar=data.image;
                localStorage.setItem('me-time-user',JSON.stringify(user));
                navigate('/');
            }else{
                toast.error("Error setting avatar. Please try again",toastOptions);
            }
        }

        

    }
    return (
           <>
            {isLoading?
                <Container>  <img src={img} className="loader" alt="loader"/></Container>
            :
            <Container>
                <div className='title-container'>
                    <h1>Pick an avatar for you profile picture</h1>
                </div>
                <div className='avatars'>
                    {avatars.map((avatar,index)=> {
                       return(<div key={index} className={`avatar ${selectedAvatar === index ? "selected" :" "}`}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)} />
                        </div>)

                    })}

                </div>
                <button className="submit-btn" onClick={setProfilePicture}> Set as Profile Picture</button>
            </Container>
            
            }
            <StyledContainer/>
            
        </>
    );
}

export default Avatar;
const Container=styled.div`
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } };
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } };
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } };
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#3b0018;
height:100vh;
width:100vw;
.loader{
    width: 500px;
    height: 500px;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
}
.title-container{
    h1{
        color:white;
    }
}
.avatars{
        display:flex;
        width:45%;
        justify-content:space-between;
        flex-wrap:wrap;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            img{
                height:6rem; 

            }
        }
        .selected{
            border:0.4rem solid #ff0e6e;
        }

}
.submit-btn{
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



`;


const StyledContainer = styled(ToastContainer)`
  
.Toastify__toast--error {
    background: #ff0e6e;
}
`;
import React from 'react';
import img from '../assets/logo.png';
import styled from 'styled-components';
import {Link} from 'react';
import Logout from './Logout';
import ContactButton from './ContactButton';

function ChatHeader({currentUser,showHideContacts}) {
    return (
        <>
        <Container>
             <div className='brand'>
                    <img src={img} alt="logo"/>
                    <h1>Me Time</h1>    
              </div>
              <div className="options">

                    <div className="current-user">
                        <div className='avatar'>
                                <img src={`data:image/svg+xml;base64,${currentUser.avatar}`} alt="avatar" />
                        </div>
                        <div className='userName'>
                                <h3>{currentUser.userName}</h3>
                        </div>
                     </div>
                    
                     <div className='logout'>
                        <Logout />
                        
                     </div>
                   
                     <div className='contacts'>
                        <ContactButton showHideContacts={showHideContacts}/>
                     
                    </div>
                    
              </div>
            
        </Container>
        </>
    );
}

export default ChatHeader;

const Container=styled.div`
background-color:#00000060;
width:80%;
height:30%;
padding:1rem;
display:grid;
grid-template-columns:25% 75%;
.brand{
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:1rem;
    border-radius:3rem;

    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
.options{
    display:flex;
    padding:1rem;
    align-items:center;
    flex-direction:row-reverse;
    gap:2rem;
    .current-user{
        display:flex;
        flex-direction:column;
        .avatar{
            img{
                height:4rem;
            }
            
        }
        .userName{
            h3{
                color:white;
            }
    }

    }

   
}

`;
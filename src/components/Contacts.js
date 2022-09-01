import React, { useState, useEffect} from 'react';
import styled from 'styled-components';


function Contacts({contacts, currentUser,changeChat,showContacts}) {
    const[currentUserName, setCurrentUserName]=useState(undefined);
    const[currentUserImage, setCurrentUserImage]=useState(undefined);
    const [currentSelected, setCurrentSelected]=useState(undefined);

    useEffect(()=>{
        if(currentUser){
            
            setCurrentUserImage(currentUser.avatar);
            setCurrentUserName(currentUser.userName);
          
        }

    },[currentUser]);

    const changeCurrentChat=(index, contact)=>{
        setCurrentSelected( index);
            changeChat(contact);
    }

    return (
        <>
            
         
        {
            showContacts && currentUserImage && currentUserName &&(
               
                <Container >
                    <h2>Contacts</h2>
                    <div className='contacts'>
                    
                        {
                            contacts.map((contact,index)=>{
                                return(
                                    <div className={`contact ${index=== currentSelected? "selected":""}`} onClick={()=>changeCurrentChat(index,contact)} key={index}>
                                        <div className='avatar' >
                                        <img src={`data:image/svg+xml;base64,${contact.avatar}`} alt="avatar" onClick={()=>setCurrentSelected(index)} />
                                        </div>
                                        <div className='userName'>
                                            <h3>{contact.userName}</h3>
                                        </div>
                                    </div>

                                )
                            
                            })
                        }
                    </div>
                 
                </Container>
            )
        }
        

    </>
        
    );
}


const Container = styled.div`
height:100%;
width:40%;
background-color:#00000060;
.contacts{
    display:flex;
    height:80%;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;
    &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color:#ffffff20;
            width:0.1rem;
            border-radius:1rem;
        }
    }

    .contact{
            background-color:#ffffff20;
            min-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius:0.2rem;
            padding:0.4rem;
            gap:1rem;
            align-items:center;
            padding-right:45%;
            justify-content:center;
            display:flex;
            transition:0.5s ease-in-out;
            .avatar{
                img{
                    height:3rem;
                }
            }
            .userName{
                    h3{
                        color:white;
                    }
            }
        }

        .selected{
            background-color:#f07aab;
        }
       
       
}
h2{
    color:white;
    text-align:center;
    padding:1rem;
}
    

}

@media screeen and (min-width:720px) and (max-width:1080px){
    gap:0.5rem;
    .userName{
        h2{
            font-size:1rem;
        }
    }

}



}

`;


export default Contacts;
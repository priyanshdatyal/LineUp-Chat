import PropTypes from 'prop-types'
import React, { Component, useRef, useState,useEffect } from 'react'
// import menofilter from "../../res/images/menofilter.png"
import '../../css/chatwindow.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
export default function ChatWindow(props) {

    const dummy = useRef();
    const [loggedid, setLogged] = useState(props.userId);
    const messagesRef = props.firestore.collection('users').doc("common_Messages").collection("messages")
    const query = messagesRef.orderBy('createdAt').limit(50);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = props.auth.currentUser;
        await messagesRef.add({
            masg: formValue,
            createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })
        scroll()
    }

    useEffect(()=>{
        var objDiv = document.getElementById("chatMsg");
        objDiv.scrollTop = objDiv.scrollHeight;
    })

    function scroll(){
        setFormValue('');
        var objDiv = document.getElementById("chatMsg");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    return (
        <>
            <div className="chat-container">
                <div className="chat-win-header">
                    <div className="win-profile">
                        {/* <img src={menofilter} /> */}
                    </div>
                    <div className='chatMsg' id="chatMsg" ref={dummy}>
                        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} userId={loggedid}/>)}
                    </div>
                    <form className='msgactions' onSubmit={sendMessage}>
                        <textarea id="messageBox" value={formValue} onChange={(e) => setFormValue(e.target.value)} className='messageBox' placeholder='Type a message....'
                        ></textarea>
                        <button className='sendButton' type='submit' disabled={!formValue}>Send</button>
                    </form>

                </div>
            </div>
        </>
    );
}
function ChatMessage(props) {
    const messageClass = props.message.uid == props.userId ? 'sentMsg' : 'rcvMsg';
    var profilepic=null
    if(messageClass=="rcvMsg")
    { 
    profilepic="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
    }
    else{
    profilepic="https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
    }
    return (<>
        <div className="msgCon">
            <div className={`${messageClass}`}>
                <p>{props.message.masg}</p>
                <img className="usrimg" src=  {profilepic} />
            </div>
        </div>
    </>)
}
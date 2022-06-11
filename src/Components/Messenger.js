import PropTypes from 'prop-types'
import React, { Component }  from 'react';
import {useState, useEffect} from 'react'
// import Draggable from 'react-draggable'
import '../css/messenger.css'
// import menofilter from "../res/images/menofilter.png"
import ChatWindow from './SubComponents/ChatWindow'
import SITC from './SubComponents/SignInToChat'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import UIOptions from './UIOptions'
import propTypes from 'prop-types'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcZDdnrP0ObgvgPpGLtfbA3Pavo54aN4Y",
    authDomain: "lineup-chat.firebaseapp.com",
    databaseURL: "https://lineup-chat-default-rtdb.firebaseio.com",
    projectId: "lineup-chat",
    storageBucket: "lineup-chat.appspot.com",
    messagingSenderId: "890805917011",
    appId: "1:890805917011:web:966ad7327145f9df793da6",
    measurementId: "G-X6GFYTMJ5B"
  };
  
firebase.initializeApp(firebaseConfig)
// const app = initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default function Messenger(prop) {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= 768;
    
    const [user] = useAuthState(auth);

    function signinwithgoogle() {
        try {

            const provider = new firebase.auth.GoogleAuthProvider()
            auth.signInWithPopup(provider)
        }
        catch (err) {
            alert(err)
        }
    }

    function signinwithfacebook() {
        try {
            const provider = new firebase.auth.FacebookAuthProvider()
            auth.signInWithPopup(provider)
        }
        catch (err) {
            alert(err)
        }

    }
    function signOut() {
        auth.signOut();
    }

    return (
        <>
            <div className="messagesApp" id="message-surf">
                <div className="app-header">
                    Messages
                </div>
               
                {
                    user
                        ? <div className='signoutmsg-btn' onClick={() => signOut()}><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-16-213352.png" /><p>Signout</p></div>
                        : null
                }

                <div className="chat-window">
                    {user
                        ?
                        // console.log(user)
                        
                        <>
                        <ChatWindow userId={user.uid } firestore={firestore} firebase={firebase} auth={auth}></ChatWindow>
                        
                        {isMobile
                                ? <div className='signoutmsg-btn' onClick={() => signOut() }id="phonelgout"><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-16-213352.png" /></div>
                                
                                : null
                        }
                        </>
                        : <SITC signinwithgoogle={() => signinwithgoogle()} signin withfacebook={() => signinwithfacebook()}></SITC>
                    }
                </div>
            </div>
        </>
    );
}

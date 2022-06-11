import logo from './logo.svg';
import './App.css';


import React, { Component }  from 'react';
// import Chatting from './Components/Chatting'
// import ChatWindow from './Components/ChatWindow';
import Messenger from './Components/Messenger'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';



function App() {

  return (
    <div className="App">

      <Messenger></Messenger>
     
    </div>
  );
}

export default App;

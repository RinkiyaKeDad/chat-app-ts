import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from './config';

import { FirebaseContextProvider } from './context/firebase-context';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatRoom from './components/ChatRoom';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <FirebaseContextProvider
      value={{
        firebase: firebase,
        firestore: firestore,
        auth: auth,
      }}
    >
      <div className='App'>
        <header className='App-header'>
          <SignOut auth={auth} />
        </header>
        <section>
          {user ? (
            <ChatRoom firebase={firebase} firestore={firestore} auth={auth} />
          ) : (
            <SignIn firebase={firebase} auth={auth} />
          )}
        </section>
      </div>
    </FirebaseContextProvider>
  );
}

export default App;

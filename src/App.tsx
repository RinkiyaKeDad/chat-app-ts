import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseConfig } from './config';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import ChatMessage from './components/ChatMessage';
import ChatRoom from './components/ChatRoom';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

// interface Message {
//   id: string;
//   text: string;
//   createdAt: { nanoseconds: number; seconds: number };
// }

function App() {
  const [user] = useAuthState(auth);

  return (
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
  );
}

// function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };

//   return (
//     <>
//       <button className='sign-in' onClick={signInWithGoogle}>
//         Sign in with Google
//       </button>
//     </>
//   );
// }

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className='sign-out' onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

// function ChatRoom() {
//   const dummy = useRef<null | HTMLDivElement>(null);
//   const messagesRef = firestore.collection('messages');
//   const query = messagesRef.orderBy('createdAt').limit(25);

//   const [messages] = useCollectionData(query, { idField: 'id' });
//   const [formValue, setFormValue] = useState('');
//   const sendMessage = async (e: any) => {
//     e.preventDefault();

//     const user = auth.currentUser;

//     if (user) {
//       const { uid, photoURL } = user;

//       await messagesRef.add({
//         text: formValue,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         uid,
//         photoURL,
//       });

//       setFormValue('');
//       dummy!.current!.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       console.log('Error Occured');
//     }
//   };
//   console.log(messages);
//   console.log(auth.currentUser);
//   return (
//     <>
//       <main>
//         <div>
//           {messages &&
//             messages.map(msg => (
//               <ChatMessage
//                 key={(msg as Message).id}
//                 message={msg}
//                 auth={auth}
//               />
//             ))}
//         </div>
//         <div ref={dummy}></div>
//       </main>
//       <form onSubmit={sendMessage}>
//         <input
//           value={formValue}
//           onChange={e => setFormValue(e.target.value)}
//           placeholder='say something nice'
//         />

//         <button type='submit' disabled={!formValue}>
//           Send
//         </button>
//       </form>
//     </>
//   );
// }

// function ChatMessage(props: any) {
//   const { text, uid, photoURL } = props.message;
//   const messageClass = uid === auth?.currentUser?.uid ? 'sent' : 'received';

//   return (
//     <>
//       <div className={`message ${messageClass}`}>
//         <img
//           src={
//             photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
//           }
//           alt='Profile'
//         />
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }

export default App;

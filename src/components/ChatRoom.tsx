import React, { useState, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
type PropDetails = {
  firebase: any;
  firestore: any;
  auth: any;
};
interface Message {
  id: string;
  text: string;
  createdAt: { nanoseconds: number; seconds: number };
}

const ChatRoom: React.FC<PropDetails> = ({ firebase, firestore, auth }) => {
  const dummy = useRef<null | HTMLDivElement>(null);
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const sendMessage = async (e: any) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user) {
      const { uid, photoURL } = user;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });

      setFormValue('');
      dummy!.current!.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Error Occured');
    }
  };
  console.log(messages);
  console.log(auth.currentUser);
  return (
    <>
      <main>
        <div>
          {messages &&
            messages.map(msg => (
              <ChatMessage
                key={(msg as Message).id}
                message={msg}
                auth={auth}
              />
            ))}
        </div>
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={e => setFormValue(e.target.value)}
          placeholder='say something nice'
        />

        <button type='submit' disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
};

export default ChatRoom;

import React from 'react';
type PropDetails = {
  message: any;
  key: any;
  auth: any;
};

const ChatMessage: React.FC<PropDetails> = ({ key, message, auth }) => {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth?.currentUser?.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
          alt='Profile'
        />
        <p>{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;

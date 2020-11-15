import React from 'react';

type PropDetails = {
  firebase: any;
  auth: any;
};

const SignIn: React.FC<PropDetails> = ({ firebase, auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
};

export default SignIn;

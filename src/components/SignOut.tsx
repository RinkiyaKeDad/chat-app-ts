import React from 'react';
type PropDetails = {
  auth: any;
};

const SignOut: React.FC<PropDetails> = ({ auth }) => {
  return (
    auth.currentUser && (
      <button className='sign-out' onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};

export default SignOut;

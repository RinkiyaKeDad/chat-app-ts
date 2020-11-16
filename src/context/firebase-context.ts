import React, { createContext } from 'react';
import firebase from 'firebase/app';

export interface FirebaseContextInterface {
  firebase: any;
  firestore: any;
  auth: any;
}
export const FirebaseContext = createContext<FirebaseContextInterface | null>(
  null
);

export const FirebaseContextProvider = FirebaseContext.Provider;
export const FirebaseContextConsumer = FirebaseContext.Consumer;

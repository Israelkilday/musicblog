import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: "AIzaSyArOJY24NOJXr2U0a1kQliX2ln3N-3luuQ",
        authDomain: "miniblog-59f42.firebaseapp.com",
        projectId: "miniblog-59f42",
        storageBucket: "miniblog-59f42.appspot.com",
        messagingSenderId: "290674308879",
        appId: "1:290674308879:web:61c9adaebb6a59483f307a"
    };

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const FirebaseContext = createContext();

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{ db }}>
            {children}
        </FirebaseContext.Provider>
    );
};

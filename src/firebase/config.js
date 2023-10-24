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


const db = getFirestore(app);

export { db };

// "dependencies": {
//     "firebase": "^10.5.0",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-firebase-hooks": "^5.1.1",
//     "react-router-dom": "^6.17.0"
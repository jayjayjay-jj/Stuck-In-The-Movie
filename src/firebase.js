// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAG1QBmQfAYF324kk8RuAY65lE-YV8k9h0",
    authDomain: "ji-tpa-desktop.firebaseapp.com",
    projectId: "ji-tpa-desktop",
    storageBucket: "ji-tpa-desktop.appspot.com",
    messagingSenderId: "83568668802",
    appId: "1:83568668802:web:abc63cecd5b640abaec49b",
    measurementId: "G-P4SBE316T2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app
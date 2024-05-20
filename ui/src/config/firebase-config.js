import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCkbMnqDGLYo3nfhHxryHRmKgfAZPXkh2o",
    authDomain: "english-empire-696e6.firebaseapp.com",
    projectId: "english-empire-696e6",
    storageBucket: "english-empire-696e6.appspot.com",
    messagingSenderId: "561482302940",
    appId: "1:561482302940:web:cb4e3a99eb643939c27b19",
    measurementId: "G-17DH82FX7K"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

export {app, auth}
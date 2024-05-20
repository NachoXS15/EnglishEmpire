import { auth } from "./firebase-config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

export function signIn(email, password){
    return signInWithEmailAndPassword(auth, email, password);
}

export function resetPassword(){
    return sendPasswordResetEmail(auth, email)
}

export function signOut(){
    return auth.signOut();
}
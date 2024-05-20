import React, { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth(){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, initializeUser);
    }, [])

    async function initializeUser(user){
        if (user){
            setCurrentUser({...user})
            setCurrentUser(true)
        }else{
            setCurrentUser(null)
            setUserLoggedIn(false)
        }

        setLoading(false)
    }

    const value = {
        currentUser,
        userLoggeidn: userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading}
        </AuthContext.Provider>
    )
}
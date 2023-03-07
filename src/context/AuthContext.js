import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth, firestore } from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();
const initialState = { isAuthenticated: false, user: { uid: "" } }
const reducer = ((state, { type, payload }) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
            };
        case "LOGOUT":
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
})
export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log("User is signed in");
                readUserData(user)

                // ...
            } else {
                // User is signed out
                // ...
                console.log("User is signed out");
            }
        });
    }, []);

    const readUserData = async (user) => {

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            let userData = docSnap.data()
            setUser(userData)
            // console.log("userData =>", userData)
            dispatch({ type: "LOGIN", payload: { user } });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    return (
        <AuthContext.Provider value={{ ...state, dispatch, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
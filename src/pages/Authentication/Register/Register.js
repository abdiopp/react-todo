import React, { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "./../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

const initialState = { email: "", password: "", displayName: '' };

export default function Register() {
    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const [state, setState] = useState(initialState);
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };



    const handleRegister = () => {
        const { email, password } = state;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                createUserProfile(user)


                // navigate("/");

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    };

    const createUserProfile = async (userCredential) => {

        let { email, uid } = userCredential
        let user = {
            fullName: state.displayName,
            email,
            uid,
        }

        try {
            await setDoc(doc(firestore, "users", user.uid), user);
            dispatch({ type: "LOGIN", payload: { user } });

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="auth">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card p-5  mx-auto" style={{ maxWidth: 580, margin: 100 }}>
                            <h1 className="text-center mb-5">Register</h1>
                            <input
                                className="form-control my-2"
                                onChange={handleChange}
                                type="text"
                                placeholder="Username"
                                name="displayName"
                            />
                            <input
                                className="form-control my-2"
                                onChange={handleChange}
                                type="email"
                                placeholder="Email"
                                name="email"
                            />
                            <input
                                className="form-control my-2"
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                            <button
                                className="btn btn-info w-100 mx-auto"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                            <Link to="/authentication/login" className="btn btn-success mt-1 w-100 mx-auto">Already a User?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

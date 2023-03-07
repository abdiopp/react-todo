import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../config/firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
const initialState = { email: "", password: "" };

export default function Login() {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext)
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))

    }
    const handleLogin = () => {
        console.log(state);
        const { email, password } = state;
        setIsProcessing(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("signInWithEmailAndPassword success", user);

                dispatch({ type: "LOGIN", payload: { user } });

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
        setIsProcessing(false);
    }
    return (
        <div className='auth'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-10  col-md-8 col-lg-6 offset-md-2 offset-lg-3 offset-sm-1">
                        <div className="card p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h3 className='mb-5'>LOGIN</h3>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" placeholder='Email' id="email" name="email" className='form-control' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" placeholder='Password' id="password" name="password" className='form-control' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className='btn w-100' onClick={handleLogin} disabled={isProcessing}>
                                        {
                                            !isProcessing ? "Login" :
                                                <div className='spinner-grow spinner-grow-sm'>

                                                </div>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <p>Need an account? <Link to="/authentication/register" className="text-dark text-center">Register</Link> </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

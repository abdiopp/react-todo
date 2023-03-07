import { AuthContext } from 'context/AuthContext';
import Login from 'pages/Authentication/Login/Login';
import React, { useContext } from 'react'
export default function PrivateRoute(props) {

    const { isAuthenticated } = useContext(AuthContext)

    const { Component } = props

    if (!isAuthenticated)
        return <Login />
    // return <Navigate to= "/authentication/login" />

    return (
        <Component />
    )
}

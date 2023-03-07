import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import Login from './Login'
import Register from './Register/Register'

export default function Authentication() {
    return (
        <Routes>
            <Route path="/" >
                <Route path='login' element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path="*" element={<Login />} />

            </Route>
        </Routes>
    )
}

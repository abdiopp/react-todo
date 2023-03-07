import PrivateRoute from 'Components/PrivateRoute'
import { AuthContext } from 'context/AuthContext'
import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Frontend from "../pages/Frontend"
import Authentication from './Authentication'
import Dashboard from "./DashBoard"
import NoPage from './NoPage'
export default function Index() {
    const { isAuthenticated } = useContext(AuthContext)

    console.log(isAuthenticated);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Frontend />} />
                    <Route path="/authentication/*" element={!isAuthenticated ? <Authentication /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard/*" element={<PrivateRoute Component={Dashboard} />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

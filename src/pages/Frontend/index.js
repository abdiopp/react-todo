import NoPage from 'pages/NoPage/NoPage';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import Header from './Components/Header';
import Home from "./Home";
import ReadTodo from './ReadTodo';
export default function index() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path='readTodo' element={<ReadTodo />} />
                        <Route path="*" element={<NoPage />} />

                    </Route>
                </Routes>
            </main>

            <Footer />
        </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>This is DashBoard</h1>
                        <Link className='btn btn-info' to="/">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

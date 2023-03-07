import { AuthContext, useAuthContext } from 'context/AuthContext';
import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { auth } from "../../../../config/firebase"
import { signOut } from 'firebase/auth';
export default function Navbar() {
  const { dispatch, isAuthenticated } = useContext(AuthContext)

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch({ type: "LOGOUT" });
      console.log("logged out");
      window.location.reload();

    });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">React Firebase Todo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto my-3 my-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" >Todos</Link>
              </li>
            </ul>
            <div className="d-flex">
              {
                !isAuthenticated
                  ?
                  <Link to='/authentication/login' className="btn btn-primary text-white">Login</Link>
                  :
                  <div>

                    <Link to="/dashboard" className="btn btn-primary btn-sm text-white me-2">Dashboard</Link>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </div>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

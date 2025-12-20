import React from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({onLogin}) => {

    const navigate = useNavigate();

     const handleLogin = (e) => {
    e.preventDefault();

     onLogin();

       navigate("/submit");
  };

  return (
    <div className="login-container">
        <form action="">
            <h1>Welcome Back</h1>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter Your Email' />

               <label htmlFor="">Password</label>
            <input type="password" placeholder='Enter Your Password' />

            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <NavLink to='/register'>Register Here</NavLink></p>
        </form>
    </div>
  )
}

export default Login
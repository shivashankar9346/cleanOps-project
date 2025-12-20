import React from 'react'
import { NavLink ,useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {

    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
      e.preventDefault();

    }


  return (
    <div className='register-form'>
        <form action="" onSubmit={handleSubmit}>
            <h1>Create your Account</h1>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Your Full Name' />

             <label htmlFor="">Email</label>
            <input type="email" placeholder='your@example.com' />

             <label htmlFor="">Password</label>
            <input type="text" placeholder='Minimun 6 Characters'/>

             <label htmlFor="">Phone</label>
            <input type="number" placeholder='Optional' />

            <label htmlFor="">Role</label>
            <select name="" id="">
                <option value="">citizen</option>
                <option value="">operator</option>
                 <option value="">ward admin</option>
                <option value="">super admin</option>
            </select>

            <label htmlFor="">Ward (optional)</label>
            <input type="text" placeholder='Ward Name/number' />

            <button>Submit</button>
        <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
        </form>
    </div>
  )
}

export default Register
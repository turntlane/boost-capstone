import React, { Component } from 'react'
import './Signup.css'

export class SignUp extends Component {



    render() {
        return (
            <div className='signup-container'>
             <form className='signup-form'>
                <h1>Sign up for Boost.</h1>
            <input className='signup-firstname signup-input' type="text" placeholder='First Name'/>
            <input className='signup-lastname signup-input' type="text" placeholder='Last Name'/>
            <input className='signup-email signup-input' type="email" placeholder='Email'/>
            <input className='signup-password signup-input' type="password" placeholder='Password'/>
            <button type='submit' className='signup-submit'>Sign Up</button>
             </form>
            </div>
        )
    }
}

export default SignUp

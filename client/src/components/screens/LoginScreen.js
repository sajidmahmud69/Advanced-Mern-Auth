import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./LoginScreen.css"

function LoginScreen({ history }) {

    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")
    const [error, setError] = useState ("")
    
    useEffect (() => {
        // if the user is already logged in just stay in that route or page
        if (localStorage.getItem ("authToken")){
            history.push ('/')
        }
    }, [history])



    const loginHandler = async (e) => {
        e.preventDefault ()

        const config = {
            header: {
                "Content-Type": "Application/json"
            }
        }

        

        try {
            const {data} = await axios.post ("/api/auth/login", {email, password}, config) // it's important that the url and the named variable such as email and password match them in the backend when you destructure them

            // backend API will send 2 things upon successful login: success and token and 
            // you can access them by using data.sucess or data.token
            localStorage.setItem ("authToken", data.token)

            history.push ('/')
        } catch (error) {
            setError (error.response.data.error)
            setTimeout (() => {
                setError ("")
            }, 5000)
        }
    }



    return (
        <div className = "login-screen">
            <form onSubmit = {loginHandler} className = "login-screen__form">
                <h3 className = "login-screen__title">Login </h3>
                { error && <span className = "error-message"> {error} </span>}
        
                    {/* Email field */}
                    <div className = "form-group">
                        <label htmlFor = "email">Email:</label>
                        <input 
                            type = "email" 
                            required 
                            id = "email" 
                            placeholder = "Enter email" 
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            />
                    </div>
                    {/* Password field */}
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input 
                            type = "password" 
                            required 
                            id = "password" 
                            placeholder = "Enter password" 
                            value = {password}
                            onChange = {(e) => setPassword (e.target.value)}
                            />
                    </div>
                    
                <button type = "submit" className = "btn btn-primary">Register</button>
                <span className = "register-screen__subtext">Already have an account? <Link to = '/login' />Login</span>
            </form>

        </div>
    )
}

export default LoginScreen

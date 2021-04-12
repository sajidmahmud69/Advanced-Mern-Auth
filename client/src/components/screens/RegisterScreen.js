import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./RegisterScreen.css"

function RegisterScreen({ history }) {

    const [username, setUsername] = useState ("")
    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")
    const [confirmPassword, setConfirmPassword] = useState ("")
    const [error, setError] = useState ("")
    

    useEffect (() => {
        // if the user is already logged in just stay in that route or page
        if (localStorage.getItem ("authToken")){
            history.push ('/')
        }
    }, [history])



    const registerHandler = async (e) => {
        e.preventDefault ()

        const config = {
            header: {
                "Content-Type": "Application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword ("")
            setConfirmPassword ("")
            
            // after 5 seconds the error should go away
            setTimeout (() => {
                setError ("")
            }, 5000)
            return setError ("Password do not match")
        }

        try {
            const {data} = await axios.post ("/api/auth/register", {username, email, password}, config) // it's important that the url and the named variable such as username, email, password match them in the backend when you destructure them

            // backend API will send 2 things upon successful registration:  success and token and 
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
        <div className = "register-screen">
            <form onSubmit = {registerHandler} className = "register-screen__form">
                <h3 className = "register-screen__title"> Register </h3>
                { error && <span className = "error-message"> {error} </span>}
                    {/* Username field */}
                    <div className = "form-group">
                        <label htmlFor = "name">Username:</label>
                        <input 
                            type = "text" 
                            required 
                            id = "name" 
                            placeholder = "Enter username" 
                            value = {username}
                            onChange = {(e) => setUsername (e.target.value)}
                        />
                    </div>
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
                    {/* Confirm password field */}
                    <div className = "form-group">
                        <label htmlFor = "confirmpassword">Confirm Password:</label>
                        <input 
                            type = "password" 
                            required 
                            id = "confirmpassword" 
                            placeholder = "Confirm password" 
                            value = {confirmPassword}
                            onChange = {(e) => setConfirmPassword (e.target.value)}
                        />
                    </div>
                <button type = "submit" className = "btn btn-primary">Register</button>
                <span className = "register-screen__subtext">Already have an account? <Link to = '/login'>Login </Link></span>
            </form>

        </div>
    )
}

export default RegisterScreen

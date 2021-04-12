import React, { useState, useEffect } from 'react'
import axios from 'axios'


function PrivateScreen({ history }) {

    const [error, setError] = useState ("")
    const [privateData, setPrivateData] = useState ("")
    
    useEffect (() => {
        // if there is not auth token immediately send them to the login page
        if (!localStorage.getItem ("authToken")){
            history.push ('/login')
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${localStorage.getItem ("authToken")}`
                }
            }

            try {
                const {data} = await axios.get ('/api/private', config)

                // backend has a data field that's why we can do data.data
                setPrivateData (data.data)

            } catch (error) {
                localStorage.removeItem ("authToken")
                setError ("You are not authorized. Please Login")

                // redirect them to login page
                history.push ('/login')
                
            }
        }

        /* This function CAN NOT be defined outside of the useEffect and MUST be defined and called
            inside the useEffect
        */
        fetchPrivateData ()
    }, [history])



    // logout functionality
    const logoutHandler = () => {
        localStorage.removeItem ("authToken")
        history.push ("/login")

    }



    return (
        error ? 
            <span className = "error-message"> { error }</span> 
            : (
                <>
                    <div style = {{ background: "green", color: "white" }}>{  privateData } </div>
                    <button onClick = {logoutHandler}>Logout</button>
                </>    
            )
    )
}

export default PrivateScreen

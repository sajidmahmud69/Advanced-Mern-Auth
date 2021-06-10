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
            headers: {
                "Content-Type": "application/json"
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

            console.error (error.response)
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
                      <label htmlFor="password">
                          Password:{" "}
                          <Link to="/forgotpassword" className="login-screen__forgotpassword">
                            Forgot Password?
                          </Link>
                      </label>
                        <input 
                            type = "password" 
                            required 
                            id = "password" 
                            placeholder = "Enter password" 
                            value = {password}
                            onChange = {(e) => setPassword (e.target.value)}
                            />
                    </div>
                    
                <button type = "submit" className = "btn btn-primary">Login</button>
                <span className = "login-screen__subtext">Don't have an account? <Link to ='/register'> Register</Link></span>
            </form>

        </div>
    )
}

export default LoginScreen















// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./LoginScreen.css";

// const LoginScreen = ({ history }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (localStorage.getItem("authToken")) {
//       history.push("/");
//     }
//   }, [history]);

//   const loginHandler = async (e) => {
//     e.preventDefault();

//     const config = {
//       header: {
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const { data } = await axios.post(
//         "/api/auth/login/",
//         { email, password },
//         config
//       ).then ((response) => console.log (response))

//       localStorage.setItem("authToken", data.token);

//       history.push("/");
//     } catch (error) {
//       // setError(error.response.data.error);
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };

//   return (
//     <div className="login-screen">
//       <form onSubmit={loginHandler} className="login-screen__form">
//         <h3 className="login-screen__title">Login</h3>
//         {error && <span className="error-message">{error}</span>}
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             required
//             id="email"
//             placeholder="Email address"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             tabIndex={1}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">
//             Password:{" "}
//             <Link to="/forgotpassword" className="login-screen__forgotpassword">
//               Forgot Password?
//             </Link>
//           </label>
//           <input
//             type="password"
//             required
//             id="password"
//             autoComplete="true"
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             tabIndex={2}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>

//         <span className="login-screen__subtext">
//           Don't have an account? <Link to="/register">Register</Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default LoginScreen;
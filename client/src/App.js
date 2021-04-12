import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Routing
import PrivateRoute from './components/routing/PrivateRoute'

// Screens
import PrivateScreen from './components/screens/PrivateScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen'
import ResetPasswordScreen from './components/screens/ResetPasswordScreen'

function App() {
    return (
        <Router>
            <div className = "app">
                <Switch>
                    {/* Home page is a private page which needs to be signed in to enter */}
                    <PrivateRoute exact path = '/' component = {PrivateScreen}/>
                    <Route exact path = '/login' component = {LoginScreen}></Route>
                    <Route exact path = '/register' component = {RegisterScreen}></Route>
                    <Route exact path = '/forgotpassword' component = {ForgotPasswordScreen}></Route>
                    <Route exact path = '/passwordreset/:resetToken' component = {ResetPasswordScreen}></Route> {/* The reason it's passwordreset and not resetpassword bcz it has to match the backend route and in backend we define this route as passwordreset in controller auth.js forgotpassword resetUrl variable*/}
                </Switch>
            </div>
        </Router>
    )
}

export default App

import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest}) {
    //  get the component that you want to render and spread the rest of the component
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("authToken") ? (
                <Component {...props} />
                ) : (
                <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute

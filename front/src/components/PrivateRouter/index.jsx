import React, { useContext } from 'react'
import { Route, Redirect  } from "react-router-dom";

const PrivateRouter = ({location, ...rest}) => {

  const auth = localStorage.getItem('auth/login');
  console.log(auth)
    return auth? (
      <Route {...rest} />
    ): (
      <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
    )
}

export default PrivateRouter

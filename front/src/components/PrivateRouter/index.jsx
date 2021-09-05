import React, { useContext } from 'react'
import { Route, Redirect  } from "react-router-dom";
import {authContext} from '../../authContext';
const PrivateRouter = ({location, ...rest}) => {
    let { auth } = useContext(authContext);

    return auth.login ? (
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

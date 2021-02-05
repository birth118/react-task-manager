import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  user

}) => (


  <Route

    render={props =>
      !user ? (
        <Redirect to='/' />
      ) : (
          <Component {...props} />
        )
    }
  />
);



export default PrivateRoute
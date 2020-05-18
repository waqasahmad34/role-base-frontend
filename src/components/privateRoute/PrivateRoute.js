import React from 'react';
import {Route,Redirect} from 'react-router-dom';


const PrivateRoute = props =>
  localStorage.getItem('accessToken') ? (
    <Route {...props} />
  ) : (
    <Redirect to="/" />
  );

export default PrivateRoute;

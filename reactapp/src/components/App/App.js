import React, { useState } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
// TODO follow this tutorial for email validation
// https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/

import './App.css';
import User from './user';
import Login from '../Login/Login';
import Register from '../Signup/Signup';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  console.log(token);
  console.log(setToken);

  if(!token) {
      console.log("no token")
      return <div>
        <Login setToken={setToken} />
        <Register setToken={setToken} />
      </div>
    }
  if (token) {
    console.log("yes token")
    return <User />
  }

// unreachable
/*
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
        <Switch>
          <Route path="/home">
            <Login setToken={setToken} />
            <Register setToken={setToken} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
  */
}

export default App;

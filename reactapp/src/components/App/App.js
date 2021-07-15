import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import User from './user';
import Login from '../Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
      return <Login setToken={setToken} />
    }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/user">
            <User></User>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  console.log(credentials);
  return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

async function verify(credentials) {
  return await fetch('http://localhost:8080/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: "verify"
  })
    .then(data => data.json());
}

// displays a login failure on screen
/*
async function loginFailure() {
  console.log("login failed");
  // display login failure
}
*/

export default function Login({ setToken }) {
  console.log("reached");
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    /*
    // check if username:password matches userdata
    var status = verify({username, password})
    if (status=={loginstatus:true}) {
      setToken(token);
    } else {
      loginFailure();
    }
    */
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

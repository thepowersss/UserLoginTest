import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  console.log("credentials toSend");
  console.log(credentials);
  const response = await fetch('http://localhost:8080/verify', {
    //mode: 'no-cors', // no-cors, *cors, same-origin
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
 })
 return response;
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,15}$"
            title="A proper username must begin with a letter, contain letters, numbers, scores and stops, and have between 3 and 15 characters long"
            onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            pattern="[a-zA-Z0-9]{6,15}"
            title="A valid password must be composed by letters and/or numbers and have a length between 6 and 15 characters"
            onChange={e => setPassword(e.target.value)} />
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

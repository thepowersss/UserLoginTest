import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function registerUser(user) {
  console.log("register user: " + user);
  return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(user)
 })
   .then(data => data.json())
}

export default function Register({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await registerUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Create an Account</h1>
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

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};

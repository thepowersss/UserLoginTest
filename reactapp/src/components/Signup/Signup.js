import React, { useState } from 'react';
import PropTypes from 'prop-types';

// will disable later
// enables login token
async function registerUser(user) {
  console.log(user);
  return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(user)
 })
   .then(data => data.json())
}

// post user data to server
async function saveUserInfo(userInfo) {
  console.log("userinfo");
  console.log(userInfo);
  return fetch('http://localhost:8080/save-data', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(userInfo)
 })
   .then(data => data.json())
}

async function registerSuccess() {
  console.log("user created!");
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
    registerSuccess();
    saveUserInfo({username, password});
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

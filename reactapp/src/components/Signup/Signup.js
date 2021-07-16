import React, { useState } from 'react';
import PropTypes from 'prop-types';

// post user data to server
// returns the response of the fetch
async function saveUserInfo(userInfo) {
  console.log("userinfo toSend");
  console.log(userInfo);
  return fetch('http://localhost:8080/save-data', {
    //mode: 'no-cors', // no-cors, *cors, same-origin
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
 })
   .then(data => data.json())
}

export default function Register({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    saveUserInfo({username, password}); // save user to userData.txt
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

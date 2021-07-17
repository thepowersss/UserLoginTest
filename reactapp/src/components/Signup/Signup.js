import React, { useState } from 'react';
import PropTypes from 'prop-types';

// post user data to server
// returns the response of the fetch
async function saveUserInfo(userInfo) {
  console.log("userinfo toSend");
  console.log(userInfo);
  const response = await fetch('http://localhost:8080/save-data', {
    //mode: 'no-cors', // no-cors, *cors, same-origin
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
 })
 return response;
}

export default function Register({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    var result = saveUserInfo({username, password}); // save user to userData.txt
    console.log(result);
  }

  return(
    <div className="login-wrapper">
      <h1>Create an Account</h1>
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

Register.propTypes = {
  setToken: PropTypes.func.isRequired
};

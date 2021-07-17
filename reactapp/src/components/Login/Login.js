import React, { useState } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
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
 }).then(data => data.json())
 return response;
}

export default function Login({ setToken }) {
  // save username and password
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  // save email validation and error
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
      setUserName(e.target.value)
    } else {
      setEmailError('Enter valid Email!')
    }
  }

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
          <p>Email</p>
            <input
              type="text"
              id="userEmail"
              onChange={(e) => validateEmail(e)}/>
              {
              // old code validates usernames, not emails
              //pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,15}$"
              //title="A proper username must begin with a letter, contain letters, numbers, scores and stops, and have between 3 and 15 characters long"
              //onChange={e => setUserName(e.target.value)}
              }
              <br/>
              <span style={{
              fontWeight: 'bold',
              color: 'red',
              }}>{emailError}</span>
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

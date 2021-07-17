import React from 'react';
import './user.css';


async function logoutUser() {
  console.log("logout user");
  document.location.href="/";
}

// gets value associated with token, which is where the username is stored
function getUsername() {
  return JSON.parse(sessionStorage.getItem('token')).token;
}

export default function User() {
  const handleSubmit = async e => {
    e.preventDefault();
    sessionStorage.removeItem('token')
    logoutUser();
  }
  return(
    <div>
      <h2>User Email:</h2>
      <p className="userDashboard">{getUsername()}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">Logout</button>
        </div>
      </form>
    </div>
  );
}

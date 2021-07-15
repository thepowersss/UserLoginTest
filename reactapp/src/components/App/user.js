import React from 'react';


async function logoutUser() {
  console.log("logout user");
  document.location.href="/";
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
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">Logout</button>
        </div>
      </form>
    </div>
  );
}

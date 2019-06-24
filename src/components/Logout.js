import React from 'react';

const Logout = (props) => {

  const handleLogout = () => {
    console.log("Clicked logout");
    localStorage.removeItem('foundUser');
    window.location = "/";
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}

export default Logout;
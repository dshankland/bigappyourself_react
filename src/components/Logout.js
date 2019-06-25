import React from 'react';
import '../compliment_container.css'

const Logout = (props) => {

  const handleLogout = () => {
    console.log("Clicked logout");
    localStorage.removeItem('foundUser');
    window.location = "/";
  }

  return (
    <div>
      <button className="ogout" onClick={handleLogout}><p>Logout</p></button>
    </div>
  )

}

export default Logout;

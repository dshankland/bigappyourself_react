import React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import '../App.css'

const Home = (props) => {

  return (
    <div>
    <div id="header">
      <h1><img src="../../favicon.ico" width="200" height="200" align="center"/>
      Big App Yourself!</h1>
    </div>
      <h2>Randomly generated compliments, but 100% sincere!</h2>

      <LoginFormContainer/>
    </div>
  )

}

export default Home;

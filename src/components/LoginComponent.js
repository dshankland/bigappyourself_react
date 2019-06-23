import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const LoginComponent = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
    <div>
      <input type="text" placeholder="Email" name="email" onChange={(event) => setEmail(event.target.value)} value={email} />
      <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} value={password}/>
    </div>
    )
}

export default LoginComponent;
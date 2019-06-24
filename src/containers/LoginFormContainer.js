import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Request from '../helpers/request';

class LoginFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      email: "",
      password: "",
      loginmessage: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentDidMount(){
    const request = new Request();

    request.get('/users')
    .then((data) => {
      this.setState({users: data._embedded.users})
      })
  }

  handleLogin(event){
    event.preventDefault();
    // check this.state.email to see if it exists in this.state.users
    let foundUser = null;
    this.state.users.forEach((user, index) => {
      if (user.email === event.target.email.value) {
        foundUser = index;
      }
    });
    let passwordMatch = null;
    if (foundUser !== null) {
      // we have a user match, lets check the password
      if (this.state.users[foundUser].password === event.target.password.value) {
        passwordMatch = true;
      }
    }
    if (passwordMatch) {
      // console.log("We have a user and password match");
      localStorage.setItem('foundUser', JSON.stringify(this.state.users[foundUser]));
      // this.context.router.push({pathname: '/compliment', state: {user: this.state.users[foundUser]}});
      window.location = "/compliment";
    } else {
      // console.log("Bad user or password");
      this.setState({loginmessage: "Bad user or password, please try again, or register.."})
    }
  }

  handleEmail(event){
    this.setState({email: event.target.value})
  }

  handlePassword(event){
    this.setState({password: event.target.value})
  }

  render(){
    if(this.state.users === 0){
      return null
    }

    return (
        <div>
        <p>Please login to be showered with compliments</p>
        <form onSubmit={this.handleLogin}>
          <input type="text" placeholder="Email" name="email" onChange={this.handleEmail} value={this.state.email} />
          <input type="password" name="password" onChange={this.handlePassword} value={this.state.password}/>
          <button type="submit">Login</button>
        </form>
        {this.state.loginmessage}
        <hr/>
        <a href="/register">Click here to register</a>
        </div>
      )
  }
}

export default LoginFormContainer;
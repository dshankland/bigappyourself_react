import React, {Component} from 'react';
import Request from '../helpers/request';

class UserRegistrationContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      compliment: "You are awesome! Thanks for registering!",
      preferences: ["GENERAL"]
    }

    this.handleRegistration = this.handleRegsistration.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentDidMount(){
  }

  handleRegsistration(event){
    event.preventDefault();
    // need to handle registration and pass on to preferences screen

  const request = new Request();
  request.post("/users", this.state)
  .then(() => {
    window.location = "/";
  })
  }

  handleFirstName(event){
    this.setState({firstName: event.target.value})
  }

  handleLastName(event){
    this.setState({lastName: event.target.value})
  }

  handleEmail(event){
    this.setState({email: event.target.value})
  }

  handlePassword(event){
    this.setState({password: event.target.value})
  }

  render(){

    return (
        <div>
        <form onSubmit={this.handleRegistration}>
          <input type="text" placeholder="First Name" name="firstName" onChange={this.handleFirstName} value={this.state.firstName} />
          <input type="text" placeholder="Last Name" name="lastName" onChange={this.handleLastName} value={this.state.lastName} />
          <input type="text" placeholder="Email" name="email" onChange={this.handleEmail} value={this.state.email} />
          <input type="password" name="password" onChange={this.handlePassword} value={this.state.password}/>
          <button type="submit">Login</button>
        </form>
        </div>
      )
  }
}
export default UserRegistrationContainer;
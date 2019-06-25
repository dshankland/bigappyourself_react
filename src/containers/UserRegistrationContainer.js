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
      preferences: [],
      twitter: "",
      phone: "",
      keywords: []
    }

    this.handleRegistration = this.handleRegsistration.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

  }

  componentDidMount(){
    const request = new Request();
    request.get('/keywords')
    .then((data) => {
      this.setState({keywords: data})
      })
  }

  handleRegsistration(event){
    event.preventDefault();

    function wait(ms){
       var start = new Date().getTime();
       var end = start;
       while(end < start + ms) {
         end = new Date().getTime();
      }
    }

    // need to handle registration and pass on to preferences screen
    const selectedPreferences = [...event.target.preferences.options].filter((option) => {
      return option.selected
    }).map((option) => {
      return option.value
    });
    console.log(selectedPreferences);
    this.setState({preferences: selectedPreferences});

    const newUser = {
      "firstName": event.target.firstName.value,
      "lastName": event.target.lastName.value,
      "email": event.target.email.value,
      "password": event.target.password.value,
      "preferences": selectedPreferences,
      "twitter": event.target.twitter.value,
      "phone": event.target.phone.value,
      "compliment": this.state.compliment
    }
    console.log(newUser);
    wait(10000);
    const request = new Request();
    request.post("/users", newUser)
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

  handleTwitter(event){
    this.setState({twitter: event.target.value})
  }

  handlePhone(event){
    this.setState({phone: event.target.value})
  }

  render(){

    if (this.state.keywords.length === 0){
      return null
    }

    const prefOptions = this.state.keywords.map((keyword, index) => {
      return <option key={index} value={keyword}>{keyword}</option>
    })

    return (
        <div>
        <form onSubmit={this.handleRegistration}>
          <fieldset>
            <legend>User Details</legend>
            <label>First Name
              <input type="text" id="firstName" placeholder="First Name" name="firstName" onChange={this.handleFirstName} value={this.state.firstName} />
            </label>
            <label>Last Name
              <input type="text" id="lastName" placeholder="Last Name" name="lastName" onChange={this.handleLastName} value={this.state.lastName} />
            </label>
            <label>Email/Login
              <input type="text" id="email" placeholder="Email" name="email" onChange={this.handleEmail} value={this.state.email} />
            </label>
            <label>Password
              <input type="password" id="password" name="password" onChange={this.handlePassword} value={this.state.password}/>
            </label>
          </fieldset>
          <fieldset>
            <legend>Contact Details</legend>
            <label>Twitter
              <input type="text" id="twitter" placeholder="Twitter" name="twitter" onChange={this.handleTwitter} value={this.state.twitter} />
            </label>
            <label>Mobile Phone
              <input type="text" id="phone" placeholder="Mobile Phone" name="phone" onChange={this.handlePhone} value={this.state.phone} />
            </label>

          </fieldset>
          <fieldset>
            <legend>Compliment Preferences</legend>
            <select multiple={true} name="preferences">
              {prefOptions}
            </select>
          </fieldset>
          <button type="submit">Register</button>
        </form>
        </div>
      )
  }
}
export default UserRegistrationContainer;
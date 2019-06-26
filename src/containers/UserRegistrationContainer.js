import React, {Component} from 'react';
import Request from '../helpers/request';
import '../registration.css';

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
    this.handleCancel = this.handleCancel.bind(this);

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

    // function wait(ms){
    //    var start = new Date().getTime();
    //    var end = start;
    //    while(end < start + ms) {
    //      end = new Date().getTime();
    //   }
    // }

    // need to handle registration and pass on to preferences screen
    // const selectedPreferences = [...event.target.preferences.options].filter((option) => {
    //   return option.selected
    // }).map((option) => {
    //   return option.value
    // });
    // console.log("Multi",selectedPreferences);
    // this.setState({preferences: selectedPreferences});

    console.log("HELLO", event.target.checkbox_pref);
    const checkboxPreferences = [...event.target.checkbox_pref].filter((option) => {
      return option.checked
    }).map((option) => {
      return option.value
    });
    checkboxPreferences.push("GENERAL");
    console.log("Checkbox",checkboxPreferences);
    this.setState({preferences: checkboxPreferences});

    const newUser = {
      "firstName": event.target.firstName.value,
      "lastName": event.target.lastName.value,
      "email": event.target.email.value,
      "password": event.target.password.value,
      "preferences": checkboxPreferences,
      "twitter": event.target.twitter.value,
      "phone": event.target.phone.value,
      "compliment": this.state.compliment
    }
    // console.log(newUser);
    // wait(10000);
    const request = new Request();
    request.post("/users", newUser)
    .then((data) => {
      // console.log(data);
      // wait(10000);
      data.json().then((user) => {
        // console.log(user);
        localStorage.setItem('foundUser', JSON.stringify(user));
        window.location = "/compliment";
      })
      // window.location = "/";
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

  handleCancel(event){
    event.preventDefault();
    window.location = "/";
  }

  render(){

    if (this.state.keywords.length === 0){
      return null
    }

    // const prefOptions = this.state.keywords.map((keyword, index) => {
    //   return <option key={index} value={keyword}>{keyword}</option>
    // })

    const prefOptionsCheckbox = this.state.keywords.map((keyword, index) => {
      if (keyword !== "GENERAL") {
        return <label className="checkbox-label" key={index}>{keyword}<input type="checkbox" className="checkbox" name="checkbox_pref" key={index} value={keyword} /></label>
      }
      return null;
    })

    return (
        <div>
          <form className="user-details-form-div" onSubmit={this.handleRegistration}>
            <div className="side-by-side-bit">
            <div className="user-details-form">
              <div className="first-name-last-name">
                <legend className="reg-form-legend">Please fill in this form to let us get to know you better.</legend>
                <label className="reg-form-label">First Name
                  <input type="text" className="reg-form-input" id="firstName" placeholder="First Name" name="firstName" onChange={this.handleFirstName} value={this.state.firstName} required/>
                </label>
                <label className="reg-form-label">Last Name
                  <input type="text" className="reg-form-input" id="lastName" placeholder="Last Name" name="lastName" onChange={this.handleLastName} value={this.state.lastName} required/>
                </label>
              </div>

              <div className="email-div">
                <label className="reg-form-label">Email/Login
                  <input type="text" className="reg-form-input" id="email" placeholder="Email" name="email" onChange={this.handleEmail} value={this.state.email} required/>
                </label>
              </div>

              <div className="password-div">
                <label className="reg-form-label">Password
                  <input type="password" className="reg-form-input" id="password" name="password" onChange={this.handlePassword} value={this.state.password} required/>
                </label>
              </div>
            </div>
            {/*<div className="logo-div">*/}
              {/*<img src="../../favicon.ico" alt="Big App Yourself" width="200" height="200" align="center" />*/}
            {/*</div>*/}
            </div>

            <legend className="reg-form-legend">How would you like your compliments ?</legend>
            <label className="reg-form-label">By tweet?
              <input type="text" className="reg-form-input" id="twitter" placeholder="Twitter handle" name="twitter" onChange={this.handleTwitter} value={this.state.twitter} />
            </label>
            <label className="reg-form-label">By text?
              <input type="text" className="reg-form-input" id="phone" placeholder="Mobile number" name="phone" onChange={this.handlePhone} value={this.state.phone} />
            </label>

            <legend className="reg-form-legend">Please tick what you'd like to be complimented on</legend>
            <div className="checkbox-grid">
              {prefOptionsCheckbox}
            </div>
            <div>
            <button type="submit">Register</button>
            </div>
            <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
          </form>
        </div>
      )
  }
}
export default UserRegistrationContainer;
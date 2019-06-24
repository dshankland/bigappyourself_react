import React, {Component} from 'react';
import Request from '../helpers/request';
import Logout from '../components/Logout';

class ComplimentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }

    this.handleBigAppButtonClick = this.handleBigAppButtonClick.bind(this);
  }

  componentWillMount(){
    let user = '';
    if (localStorage && localStorage.getItem('foundUser')) {
       user = JSON.parse(localStorage.getItem('foundUser'));
      }
     this.setState({user: user})
  }

  handleBigAppButtonClick(){
    // console.log("BigAppYourself has been clicked");
    const request = new Request();
    request.get('/users/compliment/' + this.state.user.id)
    .then((data) => {
      this.setState({user: data})
      })

  }

  render(){
    return (
        <div>
        <h1>Hi {this.state.user.firstName}!</h1>
        <h2>{this.state.user.compliment}</h2>
        <button onClick={this.handleBigAppButtonClick}><h1>BigAppYourself!</h1></button>
        <Logout/>
        </div>
      )
  }

}

export default ComplimentContainer;
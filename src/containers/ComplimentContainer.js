import React, {Component} from 'react';

class ComplimentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount(){
    let user = '';
    if (localStorage && localStorage.getItem('foundUser')) {
       user = JSON.parse(localStorage.getItem('foundUser'));
      }
     this.setState({user: user})
  }

  render(){
    return (
        <div>
        <h1>Hi {this.state.user.firstName}!</h1>
        <h2>{this.state.user.compliment}</h2>
        </div>
      )
  }

}

export default ComplimentContainer;
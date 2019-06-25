import React, {Component} from 'react';
import Request from '../helpers/request';
import Logout from '../components/Logout';

class ComplimentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      friendsTwitter: null
    }

    this.handleBigAppButtonClick = this.handleBigAppButtonClick.bind(this);
    this.handleFriend = this.handleFriend.bind(this);
    this.handleTweetYourFriend = this.handleTweetYourFriend.bind(this);
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

  handleFriend(event){
    this.setState({friendsTwitter: event.target.value})
  }

  handleTweetYourFriend(event){

    event.preventDefault();
    const request = new Request();
    if(this.state.friendsTwitter != null){
    request.get('/users/tweet/'+ this.state.friendsTwitter)
    .then((data) => {
      window.location = '/compliment'
    })
    }
  }

  render(){
    return (
        <div>
        <h1>Hi {this.state.user.firstName}!</h1>
        <h2>{this.state.user.compliment}</h2>
        <button onClick={this.handleBigAppButtonClick}><h1>BigAppYourself!</h1></button>
        <div>
          <form>
            <h3>Big App a friend!</h3>
              <input type='text' placeholder="Enter their Twitter handle here" onChange={this.handleFriend} value={this.state.friendsTwitter}/>
              <button onClick={this.handleTweetYourFriend}>Tweet!</button>
          </form>
        </div>
        <Logout/>
        </div>
      )
  }

}

export default ComplimentContainer;

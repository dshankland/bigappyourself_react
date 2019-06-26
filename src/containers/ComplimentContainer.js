import React, {Component} from 'react';
import Request from '../helpers/request';
import Logout from '../components/Logout';
import '../compliment_container.css';

class ComplimentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      friendsTwitter: ""
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
    if(this.state.friendsTwitter !== ""){
    request.get('/users/tweet/'+ this.state.friendsTwitter)
    .then((data) => {
      window.location = '/compliment'
    })
    }
  }

  render(){
    return (
        <div className="compliment_container">
          <div className="little_header_container">
          <img src="../../favicon.ico" alt="Big App Yourself logo"/>
          <h1>Big App Yourself</h1>
          </div>

        <div className="logout_container">
          <Logout/>
        </div>

          <div className="compliment">

              <h1>Hi {this.state.user.firstName}!</h1>

            <h2>{this.state.user.compliment}</h2>
          </div>
          <div className="praise_button">
            <button className="praise_me" onClick={this.handleBigAppButtonClick}><p><strong>Click for praise</strong></p></button>
          </div>

          <form className="tweet-mate">
            <label htmlFor="twitter_handle"><h3 className="tweet-spiel">Enjoy our compliments? Why not Big App a friend and share the love? Just enter your pal's Twitter handle below, click that blue button, and we'll compliment them for you.</h3></label>
            <input className="twitter_handle" type="text" name="twitter_handle" placeholder="Enter a pal's Twitter handle here" onChange={this.handleFriend} value={this.state.friendsTwitter}/>
            <button className="send_tweet" onClick={this.handleTweetYourFriend}><p>Tweet my mate!</p></button>
          </form>


        </div>
      )
  }

}

export default ComplimentContainer;

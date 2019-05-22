import React, { Component, useState} from 'react';
import './App.css';

import sdk from "./sdk.js";

import {last} from "./util.js"

/*
Todo:
  - Signup
  - Login
  - Remember me

  - Fetch user
  - Edit name
  - Edit pic

  - create rooms
  - Invite users
  - Fetch chats
  - Send messages
  - Delete rooms
  - Change chat name
  - Change chatrooms
  

  - Onscroll load more
  - Upload files
  - Update chat on message
*/

let Sidebar = ({imgurl, chats}) => <div className="sidebar">
  <div className="profile">
    <img src={imgurl} alt="" className="profile-pic"/>
  </div>
  <div className="chats">
    {
      chats.length > 0 
      ? chats.map(({title, messages}) => <div onClick={()=>{/* TODO */}} className="chat">
        <div className="chat-title">{title}</div>
        <div className = "chat-last-msg"> {
          last(messages).sender
        } : {
          last(messages).message.text
        } 
        </div>
      </div>)
      : "It seems that you have no chats"
    }
  </div>
</div>

let Messages = ({currentChat}) => <div class="messages">
    {
      currentChat.messages.length > 0 ?
      currentChat.messages.map(({isNotif, sender, msg, outgoing}) => {
        if(isNotif) return <div className="info">{msg}</div>
        return <div className={"message " + (outgoing ? "outgoing" : "incoming")}>
          {msg}
        </div>
      }) :
      "Looks like you have no messages"
    }
</div>;

let Header = ({currentChat}) => <div className="header">
  {currentChat.title}
</div>;

let LoginComponent = ({login, signup}) =>{
  let [tab, setTab] = useState(1);
  let [info, setInfo] = useState({
    email: null,
    pass: null,
    name: null,
    rememberMe: null,
  });
  let createSetter = name => evt => setInfo({
    ...info,
    [name]: evt.target.value
  })
  let tabs = [
    <div className="login">
      <label className = "row" key="email">
        email: < input type = "email" onChange={createSetter("email")}/>
      </label>
      <label className="row" key="password">
        password: <input type="password" onChange={createSetter("pass")}/>
      </label>
      <label className="row" key="remember">
        Remember Me: <input type="checkbox" name="" id="" onChange={createSetter("rememberMe")}/>
      </label>
      <button onClick={() => login(info)}>Login</button>
    </div>,
    <div className="signup">
      <label className = "row" key="email">
        email: < input type = "email" onChange={createSetter("email")}/>
      </label>
      <label className="row" key="password">
        password: <input type="password" onChange={createSetter("pass")}/>
      </label>
      <label className="row" key="name">
        name: <input type="name" onChange={createSetter("name")}/>
      </label>
      <label className="row" key="remember">
        Remember Me: <input type="checkbox" name="" id="" onChange={createSetter("rememberMe")}/>
      </label>
      <button onClick={() => signup(info)}>Signup</button>
    </div>
  ];
  return <div className="login-signup-container">
    {tabs[tab]}
  </div>
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      user: null,
      /*
      User:
        {
          name: String,
          email: String,
          imgUrl: String,

          session: String,
        }
      */
      chatrooms: [],
      cached_messages: {},
      currentChat: null,
      flash: [],
    };
  }
  render() {
    console.log(this.state.flash)
    return <div className="content"> { 
        this.state.user ? <React.Fragment>
          <Sidebar imgurl={this.state.user.imgurl} chats={this.state.chats}/>
          <Header currentChat={this.state.currentChat}/>
          <Messages currentChat={this.state.currentChat}/>
          <div className="input">
              <input type="text" name="" id="" className="text-input" placeholder=" Start typing"/>
          </div>
          
        </React.Fragment> : <React.Fragment>
            <LoginComponent 
              login={this.loginEmailPass.bind(this)} 
              signup={this.signupEmailPass.bind(this)}
          />
        </React.Fragment>
    }
    </div>
  }

  componentDidMount(){
    if(localStorage.getItem("remember") == true){
      this.signInFromRemember(localStorage.getItem("remember-token"));
    }
  }

  //* Network
  signupEmailPass({email, pass, rememberMe}){
    sdk.auth.signupEmailPass(email, pass)
      .then(this.signupSuccess.bind(this))
      .catch(this.signupFailure.bind(this));
  }
  signupSuccess(user){
    this.setState({user});
  }
  signupFailure(err){
    this.setState({flash: [...this.state.flash, err]});
  }

  loginEmailPass({email, pass, rememberMe}){
    console.log(email, pass)
    sdk.auth.signinEmailPass(email, pass)
      .then(this.signinSuccess)
      .catch(this.signinFailure);
  }
  loginFromRemember(token) {
    sdk.auth.signinRemember(token)
      .then(this.signinSuccess)
      .catch(this.signinFailure);
  }
  loginSuccess(user){
    this.setState({user});
  }
  loginFailure(err){
    this.setState({flash: [...flash, err]});
  }

  sendMessage(){}
  sendMessageSuccess(){}
  sendMessageFailure(){}

  createChat(){}
  createChatSuccess(){}
  createChatFailure(){}


  //* UI
  switchChat(){

  }
}

export default App;

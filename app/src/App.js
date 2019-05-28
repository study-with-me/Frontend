import React, {
  Component,
} from "react";
import {connect} from "react-redux";

import userActions from "./Actions";

import './App.css';
import sdk from "./sdk.js";

import Input from "./Components/Input.js";
import Messages from "./Components/Messages.js";
import Sidebar from "./Components/Sidebar.js";
import Topnav from "./Components/Topnav.js";

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

  - Last read
*/

/*
  Components
    ? Modal(children)
      @ open
      @ close

    ? AddChat
      ? Modal()
        ? Userinput
          ! Users

          @# Fetch user
          @# Create chat
          @# Generate Share url
          @ Switch chat
          ? Userlist
            ! User
              @ Del user

    ? App
      * State:
        ! User
          ! Name
          ! Session
          ! Chatrooms
          ! Profile pic
        ! Session
        ! currentChat
        ! cached messages
        ! Chatrooms

      * Lifecycle

      * Actions

      * Components
        # if(userLoggedIn)
          ? Main
            ? Sidebar
              ? Profile
                ! Main.ProfilePic
                ! Main.UserName

                @# Change Profile Pic
                @# Change name
              ? Chats
                ! Main.UserChats

                ? Chat[]
                  ! Chat
                  @ Switch Chat
                  @# Fetch messages

                ? Fab
                  @ Show AddChat

            ? Chat
              ! CurrentChat

              @# Send message
              @# Fetch messages
              @% Listen for messages

        # else
          ? Login/Signup
            ? Login
              @# Login -> Change user state | Flash message
            ? Signup
              @# Signup - > Change user state | Flash message
*/
// const LoginComponent = ({login, signup}) =>{
//   let [tab, setTab] = useState(1);
//   let [info, setInfo] = useState({
//     email: null,
//     pass: null,
//     name: null,
//     rememberMe: null,
//   });
//   let createSetter = name => evt => setInfo({
//     ...info,
//     [name]: evt.target.value
//   })
//   return <div className="login-container">
//     <div className="login-tabs">
//       <div className={`login-cover tab-${['login', 'signup'][tab]}`}>
        
//       </div>
//       <div className="login">
//         <button onClick={() => setTab(1)}>Signup <i className="fa fa-arrow-right"></i></button>
//         <h3 className="login-header">login</h3>
//         <label className = "row" key="email">
//           email: <input type = "email" onChange={createSetter("email")}/>
//         </label>
//         <label className="row" key="password">
//           password: <input type="password" onChange={createSetter("pass")}/>
//         </label>
//         <label className="row" key="remember">
//           Remember Me: <input type="checkbox" name="" id="" onChange={createSetter("rememberMe")}/>
//         </label>
//         <button onClick={() => login(info)}>Login</button>
//       </div>
//       <div className="signup">
//         <button onClick={() => setTab(0)}><i className="fa fa-arrow-left"></i> Login</button>
//         <h3 className="login-header">signup</h3>
//         <label className = "row" key="email">
//           email: < input type = "email" onChange={createSetter("email")}/>
//         </label>
//         <label className="row" key="password">
//           password: <input type="password" onChange={createSetter("pass")}/>
//         </label>
//         <label className="row" key="name">
//           name: <input type="name" onChange={createSetter("name")}/>
//         </label>
//         <label className="row" key="remember">
//           Remember Me: <input type="checkbox" name="" id="" onChange={createSetter("rememberMe")}/>
//         </label>
//         <button onClick={() => signup(info)}>Signup</button>
//       </div>
//     </div>
//   </div>
// }

class App extends Component {
  constructor (props) {
    super(props);
    sdk.auth.onSessionUpdate(s => this.updateSession(s));
  }
  render() {
    return <div className="content"> { 
        this.props.user ? <React.Fragment>
          <Sidebar />
          <Topnav />
          <Messages />
          <Input />
        </React.Fragment> : <React.Fragment>
            {/* <LoginComponent /> */}
        </React.Fragment>
    }
    </div>
  }

  componentDidMount(){
    if(localStorage.getItem("remember")){
      this.loginRemember(localStorage.getItem("remember-token"));
    }
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
}

export default connect(
  ({user}) => user,
  dispatch => ({
    ...userActions
  })
)(App);

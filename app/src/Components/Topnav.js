import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import actions from "../Actions/index.js";

import sdk from "../sdk.js";


let TopNav = ({
  chat: { currentChat },
  user: { session },
  switchChat,
  getChats,
//   openJoinChatDialog,
}) => {
    let [title, setTitle] = useState("");
    useEffect(() => {
        if(session && currentChat){
            sdk.auth.getChat(session, currentChat)
                .then(res => setTitle(res.data.title))
                .catch((err) => console.log(err))
        }
    }, [currentChat, session]);
    return <div className="header">
        {session ? title : "My Chats"}
    </div>;
};

export default connect(
  a=>a,
  actions
)(TopNav);

import React from "react";
import Message from "./Messages.js";
import { connect } from "react-redux";

let Messages = ({ chat: { cachedMessages, currentChat }, user: { email } }) => {
  // if (!currentChat) return <JoinChatComponent />;
  
  let messages = currentChat ? cachedMessages[currentChat] : null;
  if (messages.length) return "Looks like you have no messages";

  return messages.map(({ isNotif, sender, msg }) =>
    isNotif ? (
      <Message type={"info"} msg={msg} />
    ) : (
      <Message type={sender === email ? "outgoing" : "incoming"} msg={msg} />
    )
  );
};

export default connect(
  ({ chat, user }) => ({ chat, user }),
  null
)(Messages);
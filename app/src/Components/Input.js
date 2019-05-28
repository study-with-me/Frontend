import React, {createRef} from "react";
import {connect} from "react-redux";
import actions from "../Actions/index.js";

let Input = ({ currentChat, sendMessage }) => {

    let inp = createRef();
    
    return <input 
        type="text" 
        name="" 
        id="" 
        ref={inp}
        onKeyDown={evt => 
            evt.code === "Enter" 
                ? sendMessage(inp.current.value, currentChat) 
                : null
        }/>
};

export default connect(({chat}) => chat, actions)(Input)

import {combineReducers} from "redux";

import auth from "./auth.js";
import chat from "./chat.js";
import ui from "./ui.js";

export default combineReducers({auth, chat, ui});


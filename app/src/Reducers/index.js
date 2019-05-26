import {combineReducers} from "redux";

import auth from "./auth.js";
import chat from "./chat.js";
import ui from "./ui.js";

let a = (type, data) => ({ type, ...data });

export const rootReducer = combineReducers({auth, chat, ui});


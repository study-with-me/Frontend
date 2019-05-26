import sdk from "./sdk.js";

let req = func => (dispatch, getState) => (...args) => {
  let {
    name,
    success = name + "_SUCCESS",
    failure = name + "_FAILURE",
    t = _ => _,
    c = err => ({ err }),
    p,
    after = [],
    d = {}
  } = func(getState(), ...args);

  dispatch(a(name + "_REQUEST", d));
  p.then(res => dispatch(a(success, t(res))))
    .then(res => after.forEach(f => f(dispatch, getState)))
    .catch(res => dispatch(a(failure, c(res))));
};

let messageId = 0;

export default actions = {
  signup: req((state, email, password, name) => ({
    name: "SIGNUP",
    t: ({ user, session }) => ({ user, session }),
    p: sdk.signup(email, password, name),
    after: [userActions.getChats()]
  })),
  loginPassword: req((state, email, password) => ({
    name: "LOGIN_PASSWORD",
    success: "LOGIN_SUCCESS",
    failure: "LOGIN_FAILURE",
    t: ({ session }) => ({ email, password, name, session }),
    p: sdk.signup(email, password, name),
    after: [userActions.getChats()]
  })),
  loginRemember: req((state, token) => ({
    name: "LOGIN_PASSWORD",
    success: "LOGIN_SUCCESS",
    failure: "LOGIN_FAILURE",
    t: ({ session }) => ({ email, password, name, session }),
    p: sdk.signup(token),
    after: [userActions.getChats()]
  })),
  sendMessage: req(({ session }, chat, message) => {
    let msg = { ...message, id: ++messageId };
    return {
      name: "SEND_MESSAGE",
      t: ({ id }) => ({ id }),
      c: ({ id, err }) => ({ id, err }),
      p: sdk.sendMessage(session, mechat, msg), //TODO use chat and index ad msg id
      d: { chat, msg }
    };
  }),
  createChat: req(({ session }, name, users) => ({
    name: "CREATE_CHAT",
    t: ({ chat }) => ({ chat }),
    p: sdk.createChat(session, name, users)
  })),
  joinChat: req(({ session }, chat) => ({
    name: "JOIN_CHAT",
    t: ({ chat }) => ({ chat }),
    p: sdk.joinChat(session, chat),
    after: [userActions.switchChat(chat.id)]
  })),
  getChats: req(({ session }) => ({
    name: "USER_CHATS",
    t: ({ chats }) => ({ chats }),
    p: sdk.getChats(session)
  })),
  getMessages: req(({ session }, chat) => ({
    name: "USER_MESSAGES",
    t: ({ messages }) => ({ messages }),
    p: sdk.getChatMessages(session, chat, { limit: 50, offset: -50 })
  })),
  updateUser: req(({ session }, info) => ({
    name: "UPDATE_USER",
    t: ({ user }) => ({ user }),
    p: sdk.updateUser(session, info)
  })),

  switchChat: chat => (dispatch, getState) => {
    userActions.getMessages(chat)(dispatch, getState);
    dispatch(a("PICK_CHAT", { chat }));
  },

  logout: (dispatch, getState) => {
    dispatch({ type: "LOGOUT_REQUEST" });
    sdk.logout(getState().user.email);
  },
  updateSession: dispatch => session =>
    dispatch({
      type: "UPDATE_SESSION",
      session
    }),
  readMessage: (dispatch, getState) => chat =>
    dispatch({
      type: "READ_MESSAGE_NOTIF",
      chat,
      session: getState().session,
      user: getState().user.email
    }) //TODO replace with sdk
};

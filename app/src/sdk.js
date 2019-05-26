let User = (email, password) => ({
    email, password, chats: []
});
let Chat = (title, users) => ({
    title,
    messages: [],
    users: users.reduce((a, user) => ({...a, [user.email]: true}), {}),
})

let users = {}

let sessions = {}
let sessionCounter = 0;

let remember = {};
let rememberCounter = 0;

let errors = {
    userExists: email => `user ${email} already exists`,
    malformedEmail: email => `email ${email} is malformed`,
    fieldMissing: () => `password or username is missing`,
}
export default {
  auth: {
    getImgUrl: () => new Promise((resolve, reject) => resolve("asdf")),
    signup: (email, password, rememberMe) =>
      new Promise((resolve, reject) => {
        const emailRegex = /^[a-zA-Z0-9\-\_]+@[a-zA-Z0-9\-\_]+.[a-zA-Z0-9\-\_]+$/;

        if (!email || !password) return reject(errors.fieldMissing());
        if (users.hasOwnProperty(email))
          return reject(errors.userExists(email));

        users[email] = User(email, password);
        sessions[++sessionCounter] = {
          user: email,
          expires: new Date() + 10000 // In ten seconds
        };
        if (rememberMe) remember[++rememberCounter] = email;
        resolve({
          ...users[email],
          session: sessionCounter,
          remember: rememberCounter
        });
      }),
    loginPassword: (email, password, rememberMe) =>
      new Promise((resolve, reject) => {
        const emailRegex = /^[a-zA-Z0-9\-\_]+@[a-zA-Z0-9\-\_]+.[a-zA-Z0-9\-\_]+$/;

        if (!email || !password) return reject(errors.fieldMissing());
        if (!users[email]) return reject("nonexistent user"); // TODO

        if (users[email].password === password) {
          sessions[++sessionCounter] = {
            user: email,
            expires: new Date() + 10000 // In ten seconds
          };
          if (rememberMe) remember[++rememberCounter] = email;
          resolve({
            ...users[email],
            session: sessionCounter,
            remember: rememberCounter
          });
        } else {
          return reject("incorrect password");
        }
      }),
    loginRemember: id =>
      new Promise((resolve, reject) => {
        if (rememberCounter[id]) return resolve(rememberCounter[id]);
        return reject("nonexistent session");
      }),
    signout: id =>
      new Promise((resolve, reject) => {
        delete rememberCounter[id];
        return resolve("deleted");
      }),
    getChatById: (id, sessionId) =>
      new Promise((resolve, reject) => {
        // let
      }),
    getChats: session => new Promise((resolve, reject) => {}),
    getChat: (session, id) => new Promise((resolve, reject) => {})
  }
};
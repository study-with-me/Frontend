import { auth } from "initalState";

export default (state = auth, action) => ({
  ...state,
  ...{
    SIGNUP_REQUEST: ({}) => ({}),
    SIGNUP_SUCCESS: ({ user, session }) => ({ user, session }),
    //   SIGNUP_FAILURE: () => ({
    //     flash: [...flash, "Failed to sign up"]
    //   }),

    LOGIN_PASSWORD_REQUEST: ({}) => ({
      progress: {
        user: "loading",
        ...state.progress
      }
    }),
    LOGIN_REMEMBER_REQUEST: ({}) => ({
      progress: {
        user: "loading",
        ...state.progress
      }
    }),
    LOGIN_SUCCESS: ({ user, session }) => ({
      user,
      session,
      currentChat: [],
      messages: [],
      progress: {
        user: "loaded",
        ...state.progress
      }
    }),
    LOGIN_FAILURE: () => ({
      flash: [...flash, "Failed to log in"]
    }),

    LOGOUT_REQUEST: () => ({
      ...initialState,
      flash: [...flash, "Logged out"]
    }),

    UPDATE_SESSION: ({ session }) => ({
      session
    })
  }
});

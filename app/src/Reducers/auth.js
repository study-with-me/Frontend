import { auth } from "./initialState.js";

export default (state = auth, action) => ({
  ...state,
  ...{
    SIGNUP_REQUEST: () => ({}),
    SIGNUP_SUCCESS: ({ user, session }) => ({ user, session }),
    //   SIGNUP_FAILURE: () => ({
    //     flash: [...flash, "Failed to sign up"]
    //   }),

    LOGIN_PASSWORD_REQUEST: () => ({
      progress: {
        user: "loading",
        ...state.progress
      }
    }),
    LOGIN_REMEMBER_REQUEST: () => ({
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
      flash: [...state.flash, "Failed to log in"]
    }),

    LOGOUT_REQUEST: () => ({
      ...auth,
      flash: [...state.flash, "Logged out"]
    }),

    UPDATE_SESSION: ({ session }) => ({
      session
    })
  }
});

import { auth } from "initalState";

export default (state = auth, action) => ({
  ...state,
  ...{
    //TODO: send message index instead of id
    //TODO: Remember to use hacky math to sync with the currently requested messages (e.g. last 50)
    // possible id format: [chat]-[index]
    SEND_MESSAGE_REQUEST: ({ chat, message }) => ({
      cache: {
        ...state.cache,
        [chat]: [...(state.cache[chat].messages || []), message]
      },
      messageQueue: {
        ...state.messageQueue,
        [message.id]: [chat, message, "SENDING"]
      }
    }),
    SEND_MESSAGE_SUCCESS: ({ id }) => {
      let { [id]: msg, ...messageQueue } = state.messageQueue;
      let [chat] = msg;
      return {
        cache: {
          ...state.cache,
          [chat]: state.cache[chat].messages.map(m =>
            m.id === id ? { ...m, status: "SENT" } : m
          )
        },
        messageQueue
      };
    },
    SEND_MESSAGE_FAILURE: ({ id }) => {
      let { [id]: msg, ...messageQueue } = state.messageQueue;
      let [chat] = msg;
      return {
        cache: {
          ...state.cache,
          [chat]: state.cache[chat].messages.map(m =>
            m.id === id ? { ...m, status: "FAILED" } : m
          )
        },
        messageQueue
      };
    },

    // CREATE_CHAT_REQUEST: () => ({}),
    CREATE_CHAT_SUCCESS: ({ chat }) => ({
      chats: [...state.chats, chat]
    }),
    CREATE_CHAT_FAILURE: () => ({
      flash: [
        ...state.flash,
        "Could not create chat" //TODO add flash create/delete and add flash actions (with timeout del) to other creators
      ]
    }),

    // JOIN_CHAT_REQUEST: () => ({}),
    JOIN_CHAT_SUCCESS: ({ chat }) => ({
      chats: [...state.chats, chat]
    }),
    JOIN_CHAT_FAILURE: () => ({
      flash: [...state.flash, "Could not join chat"]
    }),

    USER_CHATS_REQUEST: () => ({}),
    USER_CHATS_SUCCESS: ({ chats }) => ({
      chats
    }),
    USER_CHATS_FAILURE: () => ({
      flash: [
        ...state.flash,
        "Could not update chats, try again or try reauthenicating"
      ]
    }),

    USER_MESSAGES_REQUEST: () => ({}),
    USER_MESSAGES_SUCCESS: ({ chat, messages }) => ({
      cachedMessages: {
        ...state.cachedMessages,
        [chat]: messages
      }
    }),
    USER_MESSAGES_FAILURE: () => ({
      flash: [
        ...state.flash,
        "Could not fetch messages, try again or try reauthenicating"
      ]
    })
  }
});

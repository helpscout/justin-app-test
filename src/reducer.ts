// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_CONVERSATION':
      return {
        ...state,
        conversation: action.payload,
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

// Action creators
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const setConversation = (conversation) => ({
  type: 'SET_CONVERSATION',
  payload: conversation,
});

export const setMessages = (messages) => ({
  type: 'SET_MESSAGES',
  payload: messages,
});

export default reducer;

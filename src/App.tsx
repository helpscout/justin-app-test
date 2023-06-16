import HelpScout, { NOTIFICATION_TYPES } from '@helpscout/javascript-sdk';
import { Button, DefaultStyle, Heading } from '@helpscout/ui-kit';
import { useEffect, useState } from 'react';
import ConversationPanel from './components/ConversationPanel.jsx';
import { useReducer } from 'react';
import reducer, { setUser, setConversation } from './reducer.js';

const initialState = {};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    conversation: { id: conversationId },
    user: { email: userEmail },
  } = state;

  console.log(state);

  useEffect(() => {
    HelpScout.getApplicationContext().then(({ user, conversation }) => {
      dispatch(setUser(user));
      dispatch(setConversation(conversation));
    });
  }, []);

  return (
    <div className="App">
      <DefaultStyle />
      <ConversationPanel />
      <div>
        hiiii {conversationId} {userEmail}
      </div>
    </div>
  );
}

export default App;

import HelpScout, { NOTIFICATION_TYPES } from '@helpscout/javascript-sdk';
import { Button, DefaultStyle, Heading, Spinner } from '@helpscout/ui-kit';
import { useEffect, useState } from 'react';
import ConversationPanel from './components/ConversationPanel.jsx';
import { useReducer } from 'react';
import reducer, { setUser, setConversation, setMessages } from './reducer.js';
import { getSlackMessages } from './utils/api.js';

const initialState = {};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    conversation: {},
    user: {},
    messages: [],
    hasFetchedMessages: false,
  });
  const { conversation, user, messages, hasFetchedMessages } = state;

  useEffect(() => {
    HelpScout.getApplicationContext().then(async ({ user, conversation }) => {
      dispatch(setUser(user));
      dispatch(setConversation(conversation));
    });
  }, []);

  useEffect(() => {
    if (conversation?.id) {
      getSlackMessages(conversation?.id).then((messages) => {
        dispatch(setMessages(messages));
      });
    }
  }, [conversation?.id]);

  if (!hasFetchedMessages) {
    return null;
  }

  if (messages.length) {
    return <div>{JSON.stringify(messages)}</div>;
  }

  return (
    <div className="App">
      <DefaultStyle />
      <ConversationPanel />
    </div>
  );
}

export default App;

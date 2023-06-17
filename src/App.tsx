import HelpScout, { NOTIFICATION_TYPES } from '@helpscout/javascript-sdk';
import { Button, DefaultStyle, Heading, Spinner } from '@helpscout/ui-kit';
import { useEffect, useState } from 'react';
import ConversationPanel from './components/ConversationPanel.jsx';
import { useReducer } from 'react';
import reducer, { setUser, setConversation, setMessages } from './reducer.js';
import { getSlackMessages } from './utils/api.js';
import MessagesList from './components/MessagesList.jsx';
import styled from 'styled-components';

const initialState = {
  conversation: {},
  user: {},
  messages: [],
  hasFetchedMessages: false,
  soundEffects: true,
};

const AppUI = styled.div`
  max-width: 270px;
  width: 100vw;
  font-family: var(--HSUIKitFontFamily) !important;
  font-size: var(--HSUIKitFontSize) !important;
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    return <MessagesList messages={messages} />;
  }

  return (
    <AppUI>
      <DefaultStyle />
      <ConversationPanel />
    </AppUI>
  );
}

export default App;

import HelpScout, { NOTIFICATION_TYPES } from '@helpscout/javascript-sdk';
import { Button, DefaultStyle, Heading, Spinner } from '@helpscout/ui-kit';
import { useEffect, useState } from 'react';
import ConversationPanel from './components/ConversationPanel.jsx';
import { useReducer } from 'react';
import reducer, { setUser, setConversation, setMessages } from './reducer.js';
import { getSlackMessages } from './utils/api.js';
import MessagesList from './components/MessagesList.jsx';
import styled from 'styled-components';
import { useHelpScoutStyles } from './utils/hooks.js';

const initialState = {
  conversation: {},
  user: {},
  messages: [],
  hasFetchedMessages: false,
  soundEffects: true,
  thread_ts: undefined,
};

const AppUI = styled.div`
  max-width: 270px;
  width: 100vw;
  font-family: var(--HSUIKitFontFamily) !important;
  font-size: var(--HSUIKitFontSize) !important;
  max-width: 100%;
  overflow-x: hidden;
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { conversation, user, messages, hasFetchedMessages } = state;

  useHelpScoutStyles();

  useEffect(() => {
    HelpScout.getApplicationContext()
      .then(({ user, conversation }) => {
        console.log('fetched context');
        dispatch(setUser(user));
        dispatch(setConversation(conversation));
      })
      .catch((err) => {
        console.log(err);
        console.log('failed to fetch context');
      });
  }, [conversation?.id]);

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

  return (
    <AppUI>
      <DefaultStyle />
      <ConversationPanel state={state} dispatch={dispatch} />
    </AppUI>
  );
}

export default App;

import MessageEditor from './MessageEditor';
import { Button, Heading } from '@helpscout/ui-kit';
import { useState } from 'react';
import { createSlackThread } from '../utils/api';
import styled, { css } from 'styled-components';
import MessagesList from './MessagesList.jsx';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 214px;
`;

const ConversationPanelWrapper = styled.div`
  overflow: scroll;
  height: 300px;
  padding-right: 8px;
`;

const Composer = ({ text, setText, onSendMessage }) => (
  <>
    <MessageEditor text={text} setText={setText} />
    <ButtonWrapper>
      <Button size="sm" onClick={onSendMessage}>
        Send to Slack
      </Button>
    </ButtonWrapper>
  </>
);

const ConversationPanel = ({ state }) => {
  const [text, setText] = useState('');
  const { messages } = state;

  const onSendMessage = async () => {
    const conversationId = state?.conversation?.id;
    const user = state?.user;
    await createSlackThread({ text, conversationId, user });
  };

  return (
    <ConversationPanelWrapper>
      {messages.length ? <MessagesList messages={messages} /> : null}
      <Composer text={text} setText={setText} onSendMessage={onSendMessage} />
    </ConversationPanelWrapper>
  );
};

export default ConversationPanel;

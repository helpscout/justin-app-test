import MessageEditor from './MessageEditor';
import { Button, Heading } from '@helpscout/ui-kit';
import { useState } from 'react';
import { createSlackThread } from '../utils/api';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 225px;
`;

const ConversationPanel = () => {
  const [text, setText] = useState('');

  const onSendMessage = async () => {
    await createSlackThread(text);
  };

  return (
    <div className="ConversationPanel">
      <MessageEditor text={text} setText={setText} />
      <ButtonWrapper>
        <Button size="sm" onClick={onSendMessage}>
          Send to Slack
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default ConversationPanel;

import MessageEditor from './MessageEditor';
import { Button, Heading } from '@helpscout/ui-kit';
import { useState } from 'react';
import { createSlackThread } from '../utils/api';

const ConversationPanel = () => {
  const [text, setText] = useState('');

  const onSendMessage = async () => {
    await createSlackThread(text);
  };

  return (
    <div className="ConversationPanel">
      <MessageEditor text={text} setText={setText} />
      <Button size="sm" onClick={onSendMessage}>
        Click me
      </Button>
    </div>
  );
};

export default ConversationPanel;

import { useSpring, animated, useTransition } from 'react-spring';
import MessageEditor from './MessageEditor';
import { Button, Heading } from '@helpscout/ui-kit';
import { useState, useEffect } from 'react';
import { createSlackThread, getSlackMessages } from '../utils/api';
import styled from 'styled-components';
import MessagesList from './MessagesList.jsx';
import { setMessages } from '../reducer.ts';

const AnimatedButtonWrapper = styled(animated.div)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 214px;
  margin-bottom: 10px;
`;

const AnimatedMessageEditor = styled(animated.div)``;

const ConversationPanelWrapper = styled.div`
  overflow: scroll;
  height: 300px;
  padding-right: 8px;
`;

const Composer = ({ text, setText, onSendMessage, hasMessages }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  const buttonAnimation = useSpring({
    opacity: startAnimation ? 0 : 1,
    delay: 200,
    onRest: startAnimation ? onSendMessage : null,
  });

  const textAreaAnimation = useSpring({
    opacity: startAnimation ? 0 : 1,
    delay: 400,
  });

  const handleClick = () => {
    setStartAnimation(true);
  };

  return (
    <>
      <AnimatedMessageEditor style={textAreaAnimation}>
        <MessageEditor
          text={text}
          setText={setText}
          hasMessages={hasMessages}
        />
      </AnimatedMessageEditor>
      <AnimatedButtonWrapper style={buttonAnimation} hasMessages={hasMessages}>
        <Button size="sm" onClick={handleClick}>
          {hasMessages ? 'Reply' : 'Send to Slack'}
        </Button>
      </AnimatedButtonWrapper>
    </>
  );
};

const ConversationPanel = ({ state, dispatch }) => {
  const [text, setText] = useState('');
  const { messages } = state;
  const [displayMessages, setDisplayMessages] = useState(messages);
  const [startListAnimation, setStartListAnimation] = useState(false);

  useEffect(() => {
    setDisplayMessages(messages);
    if (messages.length > 0) {
      setStartListAnimation(true);
    }
  }, [messages]);

  const messagesAnimation = useSpring({
    opacity: startListAnimation ? 1 : 0,
    delay: 600,
  });

  const onSendMessage = async () => {
    const conversationId = state?.conversation?.id;
    const user = state?.user;
    await createSlackThread({ text, conversationId, user });
    setText(''); // Clear text area after sending message
    console.log('fetch');
    const messages = await getSlackMessages(conversationId);
    dispatch(setMessages(messages));
  };

  return (
    <ConversationPanelWrapper>
      <animated.div style={messagesAnimation}>
        {displayMessages.length > 0 ? (
          <MessagesList messages={displayMessages} />
        ) : null}
      </animated.div>
      <Composer
        text={text}
        setText={setText}
        onSendMessage={onSendMessage}
        hasMessages={messages?.length}
      />
    </ConversationPanelWrapper>
  );
};

export default ConversationPanel;

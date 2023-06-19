import { useSpring, animated, useTransition } from 'react-spring';
import MessageEditor from './MessageEditor';
import { Button } from '@helpscout/ui-kit';
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
    delay: startAnimation ? 200 : 0, // For disappearance
    config: { duration: 200 }, // Control the duration of animation
    onRest: startAnimation ? onSendMessage : null,
  });

  const textAreaAnimation = useSpring({
    opacity: startAnimation ? 0 : 1,
    delay: startAnimation ? 300 : 0, // For disappearance
    config: { duration: 300 }, // Control the duration of animation
  });

  const handleClick = () => {
    setStartAnimation(true);
  };

  // Adjust this useEffect hook
  useEffect(() => {
    if (startAnimation) {
      const timeout = setTimeout(() => {
        setStartAnimation(false);
      }, 3000); // This should be the duration of the longest animation

      return () => clearTimeout(timeout);
    }
  }, [startAnimation]);

  return (
    <>
      <AnimatedMessageEditor
        style={{
          ...textAreaAnimation,
          display: textAreaAnimation.opacity.interpolate((opacity) =>
            opacity === 0 ? 'none' : 'block'
          ),
        }}
      >
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
  const { messages, thread_ts } = state;
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
    delay: 200,
  });

  const onSendMessage = async () => {
    const conversationId = state?.conversation?.id;
    const user = state?.user;

    await createSlackThread({ text, conversationId, user, thread_ts });
    setText(''); // Clear text area after sending message

    // Initial fetch
    console.log('fetch');
    let messages = await getSlackMessages(conversationId);
    dispatch(setMessages(messages));

    //expensive polling trick for demo that will not scale
    let count = 0;
    const intervalId = setInterval(async () => {
      // Fetch messages every 5 seconds
      console.log('fetch ', count);
      messages = await getSlackMessages(conversationId);
      dispatch(setMessages(messages));

      count += 1;
      if (count === 12) {
        // Stop fetching after 12 executions
        clearInterval(intervalId);
      }
    }, 5000);
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

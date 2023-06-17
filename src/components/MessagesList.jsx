//message?.user?.display_name

import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: flex-end;
  flex-direction: column; // Add this
  align-items: flex-end; // Add this
`;

const Sender = styled.h2`
  font-size: 0.9em; // Adjust as needed
  color: #333;
  width: 100%;
  text-align: right; // Add this
`;

const MessageCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 0.4em 0.7em;
  background-color: #f0f0f0;
  max-width: 80%;
  word-wrap: break-word;
  font-family: var(--HSUIKitFontFamily) !important;
  font-size: var(--HSUIKitFontSize) !important;
`;

const FirstMessageContainer = styled(MessageContainer)`
  justify-content: flex-start;
`;

const FirstMessageCard = styled(MessageCard)`
  border-color: #999;
  background-color: #e0e0e0;
  max-width: 90%;
`;

const Message = ({ message, isFirst }) => {
  return isFirst ? (
    <FirstMessageContainer>
      <Sender>{message?.user?.display_name}</Sender>
      <FirstMessageCard>{message.text}</FirstMessageCard>
    </FirstMessageContainer>
  ) : (
    <MessageContainer>
      <Sender>{message?.user?.display_name}</Sender>
      <MessageCard>{message.text}</MessageCard>
    </MessageContainer>
  );
};

const MessagesListContainer = styled.div`
  padding: 1em;
  max-width: 600px;
  margin: auto;
`;

const MessagesList = ({ messages }) => {
  return (
    <MessagesListContainer>
      {messages.map((message, index) => (
        <Message key={index} message={message} isFirst={index === 0} />
      ))}
    </MessagesListContainer>
  );
};

export default MessagesList;

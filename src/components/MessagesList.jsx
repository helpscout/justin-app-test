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
  margin: 0px 0px 7px 0px;
`;

const MessageCard = styled.div`
  border-radius: 6px;
  padding: 0.4em 0.7em;
  background-color: rgb(235, 236, 255);
  max-width: 80%;
  word-wrap: break-word;
  font-family: 'Aktiv Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
  font-size: 14px;
`;

const FirstMessageContainer = styled(MessageContainer)`
  justify-content: flex-start;
`;

const FirstMessageCard = styled(MessageCard)`
  background-color: rgb(249, 249, 255);
  max-width: 88%;
  padding: 1em;
  margin-top: 0px;
  box-shadow: 0px 0px 0px 1px #dfdfdf, 0px 1px 0px #c5ced6,
    0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Message = ({ message, isFirst }) => {
  return isFirst ? (
    <FirstMessageContainer>
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
  margin-right: 8px;
  margin-top: -5px;
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

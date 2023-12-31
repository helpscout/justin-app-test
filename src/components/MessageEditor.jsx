import styled from 'styled-components';

const TextareaUI = styled.textarea`
  height: ${({ hasMessages }) => (hasMessages ? '100px' : '244px')};
  margin-bottom: 10px;
  width: 212px;
  padding: 1em;
  line-height: 1.5em;
  background-color: white;
  box-shadow: 0px 0px 0px 1px #dfdfdf, 0px 1px 0px #c5ced6,
    0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 0;
  border-radius: 6px;
  max-height: 244px;
  resize: none;
  background-color: rgb(249, 249, 255);
  font-family: 'Aktiv Grotesk', 'Segoe UI', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
  &:focus {
    outline: #1292ee auto 1px;
  }
  margin-top: 2px;
  margin-left: 2px;
`;

const MessageEditor = ({ text, setText, hasMessages }) => {
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <TextareaUI
      value={text}
      hasMessages={hasMessages}
      placeholder={
        hasMessages
          ? 'Type a message...'
          : 'Ask your team a question on Slack...'
      }
      onChange={handleChange}
    />
  );
};

export default MessageEditor;

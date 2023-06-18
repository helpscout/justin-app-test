import styled from 'styled-components';

const TextareaUI = styled.textarea`
  height: 244px;
  margin-bottom: 10px;
  width: 225px;
  padding: 1em;
  line-height: 1.5em;
  background-color: white;
`;

const MessageEditor = ({ text, setText }) => {
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return <TextareaUI value={text} onChange={handleChange} />;
};

export default MessageEditor;

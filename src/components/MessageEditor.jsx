const MessageEditor = ({ text, setText }) => {
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return <textarea value={text} onChange={handleChange} />;
};

export default MessageEditor;

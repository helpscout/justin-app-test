import MessageEditor from './MessageEditor';
import { Button, Heading } from '@helpscout/ui-kit';

const ConversationPanel = () => {
  function onClick() {
    alert('hi');
    HelpScout.showNotification(
      NOTIFICATION_TYPES.SUCCESS,
      'Hello from the sidebar apps'
    );
  }

  return (
    <div className="ConversationPanel">
      <Heading level="h1">Hi</Heading>
      <br />
      <p>hellooooo</p>
      <MessageEditor />
      <Button size="sm" onClick={onClick}>
        Click me
      </Button>
    </div>
  );
};

export default ConversationPanel;

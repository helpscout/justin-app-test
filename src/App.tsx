import HelpScout, { NOTIFICATION_TYPES } from '@helpscout/javascript-sdk';
import { Button, DefaultStyle, Heading } from '@helpscout/ui-kit';
import { useEffect, useState } from 'react';
import ConversationPanel from './components/ConversationPanel.jsx';

function App() {
  const [userEmail, setUserEmail] = useState<string | undefined>(
    'unknown user'
  );

  useEffect(() => {
    HelpScout.getApplicationContext().then(({ user }) =>
      setUserEmail(user?.email)
    );
  }, []);

  return (
    <div className="App">
      <DefaultStyle />
      <ConversationPanel />
    </div>
  );
}

export default App;

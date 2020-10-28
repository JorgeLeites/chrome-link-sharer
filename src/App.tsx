import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import QRCode from 'qrcode.react';

import Clipboard from './components/clipboard/clipboard';

function App() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url || '');
    });
  }, []);

  return (
    <div className="extension">
      <Container className="p-4 text-center">
        <QRCode size={256} value={url} />
        <Clipboard url={url} />
      </Container>
    </div>
  );
}

export default App;

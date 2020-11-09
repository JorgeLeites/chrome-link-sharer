import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

import Clipboard from './components/clipboard/clipboard';
import QRCode from './components/qr_code/qr_code';

function App() {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url);
    });
  }, []);

  return (
    <div className="extension">
      <Container className="p-4 text-center">
        <QRCode url={url} />
        <Clipboard url={url} />
      </Container>
    </div>
  );
}

export default App;

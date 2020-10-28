import React from 'react';
import { Container } from 'react-bootstrap';

import './App.scss';
import Clipboard from './components/clipboard/clipboard';

function App() {
  return (
    <div className="extension">
      <Container className="py-4">
        <Clipboard />
      </Container>
    </div>
  );
}

export default App;

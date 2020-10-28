import React from 'react';
import { Container } from 'reactstrap';

import './App.scss';
import Clipboard from './components/clipboard/clipboard';

function App() {
  return (
    <div className="extension">
      <Container className="py-5">
        <Clipboard />
      </Container>
    </div>
  );
}

export default App;

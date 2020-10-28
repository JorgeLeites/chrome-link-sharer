import React, { useEffect, useRef, useState } from 'react';
import { InputGroup, FormControl, Button, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faClipboard } from '@fortawesome/free-solid-svg-icons';
import ClipboardTooltip from './clipboard_tooltip';

export default function Clipboard() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url || '');
    });
  }, []);

  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (input.current) {
      input.current.select();
      document.execCommand('copy');
      event.currentTarget.focus();
      setCopied(true);
    }
  };

  return (
    <InputGroup className="mt-3">
      <InputGroup.Prepend>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faLink} />
        </InputGroup.Text>
      </InputGroup.Prepend>

      <FormControl ref={input} id="page-url" readOnly value={url} />

      <InputGroup.Append>
        <OverlayTrigger
          onExit={() => setCopied(false)}
          placement="top"
          overlay={
            <ClipboardTooltip id="tooltip-copy">
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </ClipboardTooltip>
          }
        >
          <Button onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faClipboard} />
          </Button>
        </OverlayTrigger>
      </InputGroup.Append>
    </InputGroup>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faClipboard } from '@fortawesome/free-solid-svg-icons';

import ClipboardTooltip from './clipboard_tooltip';

export default function Clipboard() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url || '');
    });
  }, []);

  const toggleTooltip = () => {
    setTooltipOpen((prevState: boolean) => !prevState);
    setCopied(false);
  };

  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (input.current) {
      input.current.select();
      document.execCommand('copy');
      event.currentTarget.focus();
      setCopied(true);
      setTooltipOpen(true);
    }
  };

  return (
    <InputGroup className="mt-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <FontAwesomeIcon icon={faLink} />
        </InputGroupText>
      </InputGroupAddon>

      <Input innerRef={input} type="text" name="page-url" id="page-url" value={url} />

      <InputGroupAddon addonType="append">
        <Button id="clipboard-button" color="primary" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faClipboard} />
        </Button>
        <Tooltip
          isOpen={tooltipOpen}
          placement="top"
          target="clipboard-button"
          toggle={toggleTooltip}
        >
          {(props) => (
            <ClipboardTooltip scheduleUpdate={props.scheduleUpdate}>
              {copied ? 'Copied' : 'Copy to clipboard'}
            </ClipboardTooltip>
          )}
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  );
}

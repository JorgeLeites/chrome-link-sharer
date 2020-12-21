import React, { useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faClipboard } from '@fortawesome/free-solid-svg-icons';

import ClipboardTooltip from './clipboard_tooltip';

interface Props {
  url?: string;
}

export default function Clipboard(props: Props) {
  const { url } = props;
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen((prevState: boolean) => !prevState);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url || '');
    setCopied(true);
    setTooltipOpen(true);
  };

  return (
    <InputGroup className="mt-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <FontAwesomeIcon icon={faLink} />
        </InputGroupText>
      </InputGroupAddon>

      <Input readOnly type="text" name="page-url" id="page-url" value={url || ''} />

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

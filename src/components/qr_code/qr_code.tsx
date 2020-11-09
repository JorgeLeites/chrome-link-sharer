import React, { useEffect, useState } from 'react';
import QRGenerator from 'qrcode';
import { Spinner } from 'reactstrap';

import './qr_code.scss';

interface Props {
  url?: string;
}

export default function QRCode(props: Props) {
  const { url } = props;
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    if (url) {
      QRGenerator.toDataURL(url, { margin: 0, scale: 16 })
        .then((imageData) => {
          setImage(imageData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [url]);

  if (image !== undefined) {
    return <img className="qr-code" src={image} alt="QR Code" />;
  }

  return (
    <div className="qr-code">
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <Spinner color="primary" />
      </div>
    </div>
  );
}

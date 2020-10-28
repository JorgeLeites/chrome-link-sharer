import React, { useEffect } from 'react';
import { Tooltip } from 'react-bootstrap';

export default React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const { popper, children } = props;

  useEffect(() => {
    popper.scheduleUpdate();
  }, [children, popper]);

  return (
    <Tooltip ref={ref} {...props}>
      {children}
    </Tooltip>
  );
});

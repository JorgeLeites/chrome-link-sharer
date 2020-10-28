import React, { Fragment, PropsWithChildren, useEffect } from 'react';

interface Props {
  scheduleUpdate: () => void;
}

export default function TooltipContent(props: PropsWithChildren<Props>) {
  const { scheduleUpdate, children } = props;

  useEffect(() => {
    scheduleUpdate();
  }, [scheduleUpdate, children]);

  return <Fragment>{children}</Fragment>;
}

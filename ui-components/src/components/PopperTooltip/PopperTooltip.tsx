import React from 'react';
import { usePopper } from 'react-popper';

type PopperTooltipProps = {
  children?: any;
};

export const PopperTooltip: React.FC<PopperTooltipProps> = () => {
  const triggerRef = React.useRef(null);
  const tooltipRef = React.useRef(null);

  const { styles, attributes } = usePopper(
    triggerRef.current,
    tooltipRef.current
  );

  return (
    <>
      <div ref={triggerRef}>Click here!</div>
      <div ref={tooltipRef} style={styles.popper} {...attributes.popper}>
        Hello World!
      </div>
    </>
  );
};

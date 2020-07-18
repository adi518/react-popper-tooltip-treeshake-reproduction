import React from 'react';
import Tooltip from 'react-popper-tooltip';

type PopperTooltipProps = {
  children?: any;
};

const Container = () => <div></div>;
const Trigger = () => <div></div>;

export const PopperTooltip: React.FC<PopperTooltipProps> = () => {
  return <Tooltip tooltip={Container}>{Trigger}</Tooltip>;
};

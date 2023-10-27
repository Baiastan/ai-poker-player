import { FC } from 'react';

interface SpadesIconProps {
  width?: string;
  height?: string;
  fillColor?: string;
}

const SpadesIcon: FC<SpadesIconProps> = ({ width = '20', height = '20' }) => {
  return <img src="/spades.png" width={height} height={width} />;
};

export default SpadesIcon;

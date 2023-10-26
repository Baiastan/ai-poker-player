import { FC } from 'react';

interface DiamondsIconProps {
  width?: string;
  height?: string;
  fillColor?: string;
}

const DiamondsIcon: FC<DiamondsIconProps> = ({
  width = '20',
  height = '20',
  fillColor = 'red',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fillColor}
    >
      <path d="M12 2L2 12l10 10l10-10L12 2z" />
    </svg>
  );
};

export default DiamondsIcon;

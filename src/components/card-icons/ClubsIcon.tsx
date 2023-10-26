import { FC } from 'react';

interface ClubsIconProps {
  width?: string;
  height?: string;
  fillColor?: string;
}

const ClubsIcon: FC<ClubsIconProps> = ({
  width = '20',
  height = '20',
  fillColor = 'black',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fillColor}
    >
      <path
        d="M16.5,14c-1.74,0-3.41-0.81-4.5-2.09C11.91,9.81,10.24,9,8.5,9C5.42,
      9,3,11.42,3,14.5S5.42,20,8.5,20c1.74,0,3.41-0.81,4.5-2.09C13.09,20.19,14.76,21,16.5,21c3.08,0,5.5-2.42,5.5-5.5S19.58,10,16.5,10zM8.5,3c1.93,0,3.5,1.57,3.5,3.5S10.43,10,8.5,10S5,8.43,5,6.5S6.57,3,8.5,3zM15.5,4c1.93,0,3.5,1.57,3.5,3.5s-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5S13.57,4,15.5,4z"
      />
    </svg>
  );
};

export default ClubsIcon;

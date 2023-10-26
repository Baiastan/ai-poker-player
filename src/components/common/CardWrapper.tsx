import React, { FC } from 'react';

import './CardWrapper.less';

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CardWrapper: FC<CardWrapperProps> = ({ children, className }) => {
  return <div className={`cardWrapper ${className}`}>{children}</div>;
};

export default CardWrapper;

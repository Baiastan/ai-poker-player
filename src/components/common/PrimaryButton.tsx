import { FC, ReactNode } from 'react';

import './Button.less';

interface PrimaryButtonProps {
  children?: ReactNode;
  className?: string;
  text?: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  className,
  onClick,
  text,
  color,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`primaryButton ${className}`}
      style={{ background: color }}
      disabled={disabled}
    >
      {text}
      {children ? children : null}
    </button>
  );
};

export default PrimaryButton;

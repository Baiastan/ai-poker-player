import { FC, ReactNode } from 'react';

import './Button.less';

interface PrimaryButtonProps {
  children?: ReactNode;
  className?: string;
  text?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  disabled?: boolean;
  type?: string;
  width?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  className = '',
  onClick,
  value,
  text,
  color,
  disabled,
  type = 'button',
  width,
}) => {
  return (
    <button
      onClick={onClick}
      value={value}
      type={type}
      className={`button primaryButton ${className}`}
      style={{ background: color, width: `${width}px` }}
      disabled={disabled}
    >
      {text}
      {children ? children : null}
    </button>
  );
};

export default PrimaryButton;

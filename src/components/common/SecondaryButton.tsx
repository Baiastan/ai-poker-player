import { FC, ReactNode } from 'react';

import './Button.less';

interface SecondaryButtonProps {
  children?: ReactNode;
  className?: string;
  text?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  value?: string;
  width?: string;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  className = '',
  onClick,
  text,
  color,
  disabled,
  value,
  width,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button secondaryButton ${className}`}
      style={{ background: color, width: `${width}px` }}
      disabled={disabled}
      type="button"
      value={value}
    >
      {text}
      {children}
    </button>
  );
};

export default SecondaryButton;

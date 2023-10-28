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
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  className,
  onClick,
  value,
  text,
  color,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      value={value}
      className={`button primaryButton ${className}`}
      style={{ background: color }}
      disabled={disabled}
    >
      {text}
      {children ? children : null}
    </button>
  );
};

export default PrimaryButton;

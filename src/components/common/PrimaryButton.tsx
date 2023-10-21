import { FC } from 'react';

import './Button.less';

interface PrimaryButtonProps {
  text: string;
  className?: string;
  color?: string;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  className,
  onClick,
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
    </button>
  );
};

export default PrimaryButton;

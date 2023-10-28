import { FC, ChangeEvent } from 'react';
import './RadioButton.less'; // Importing the styles

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
  className?: string; // For passing custom classes
}

const RadioButton: FC<RadioButtonProps> = ({
  id,
  name,
  value,
  label,
  onChange,
  className = '',
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  const combinedClass = `radioButton ${className}`; // Combine default with passed class

  return (
    <div className={combinedClass}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;

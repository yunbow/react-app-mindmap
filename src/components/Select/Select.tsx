import { ChangeEvent } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
  id?: string;
}

export const Select = ({
  value,
  onChange,
  options,
  className = '',
  id
}: SelectProps) => {
  const combinedClassName = `${styles.select} ${className}`.trim();

  return (
    <select
      value={value}
      onChange={onChange}
      className={combinedClassName}
      id={id}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
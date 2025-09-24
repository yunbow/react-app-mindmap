import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'color';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  id
}: InputProps) => {
  const combinedClassName = `${styles.input} ${className}`.trim();

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClassName}
      id={id}
    />
  );
};
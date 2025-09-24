import { ChangeEvent } from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  id?: string;
}

export const TextArea = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  id
}: TextAreaProps) => {
  const combinedClassName = `${styles.textarea} ${className}`.trim();

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={combinedClassName}
      id={id}
    />
  );
};
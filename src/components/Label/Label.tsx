import { ReactNode } from 'react';
import styles from './Label.module.css';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export const Label = ({
  children,
  htmlFor,
  className = ''
}: LabelProps) => {
  const combinedClassName = `${styles.label} ${className}`.trim();

  return (
    <label
      htmlFor={htmlFor}
      className={combinedClassName}
    >
      {children}
    </label>
  );
};
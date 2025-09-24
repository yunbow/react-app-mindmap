import { ReactNode } from 'react';
import styles from './FormGroup.module.css';

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export const FormGroup = ({
  children,
  className = ''
}: FormGroupProps) => {
  const combinedClassName = `${styles.formGroup} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};
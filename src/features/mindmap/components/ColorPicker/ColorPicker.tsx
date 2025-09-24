import { ChangeEvent } from 'react';
import { Input } from '../../../../components/Input';
import { Label } from '../../../../components/Label';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  id?: string;
}

export const ColorPicker = ({
  label,
  value,
  onChange,
  id
}: ColorPickerProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.colorPicker}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="color"
        value={value}
        onChange={handleChange}
        id={id}
      />
    </div>
  );
};
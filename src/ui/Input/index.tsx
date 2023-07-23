import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, errors, className, ...attrs }, ref) => {
  let _class = 'input';
  if (className) _class += ' ' + className;

  return (
    <label className="label">
      {label && <span>{label}</span>}
      <input ref={ref} className={_class} {...attrs} />
      {errors && <div className="alert">{errors.message}</div>}
    </label>
  );
});

export default Input;

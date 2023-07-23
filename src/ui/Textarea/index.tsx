import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import './textarea.css';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errors?: FieldError;
}

const Select = forwardRef<HTMLTextAreaElement, InputProps>(({ label, errors, className, ...attrs }, ref) => {
  let _class = 'textarea';
  if (className) _class += ' ' + className;

  return (
    <label className="label">
      {label && <span>{label}</span>}
      <textarea ref={ref} className={_class} {...attrs}></textarea>
      {errors && <div className="alert">{errors.message}</div>}
    </label>
  );
});

export default Select;

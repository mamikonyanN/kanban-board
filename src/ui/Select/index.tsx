import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import './select.css';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  errors?: FieldError;
  options: any[];
  valueField?: string;
  titleField?: string;
}

const Select = forwardRef<HTMLSelectElement, InputProps>((props, ref) => {
  const { label, errors, className, options, valueField = 'value', titleField = 'title', ...attrs } = props;

  if (!options.length) return;

  let _class = 'select';
  if (className) _class += ' ' + className;

  return (
    <label className="label">
      {label && <span>{label}</span>}
      <select ref={ref} className={_class} {...attrs}>
        {options.map((option) => (
          <option value={option[valueField]} key={option[valueField] + '_' + option[titleField]}>
            {option[titleField]}
          </option>
        ))}
      </select>
      {errors && <div className="alert">{errors.message}</div>}
    </label>
  );
});

export default Select;

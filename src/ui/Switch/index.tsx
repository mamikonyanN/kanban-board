import { FC, InputHTMLAttributes } from 'react';
import './switch.css';

interface SwitchParams extends InputHTMLAttributes<HTMLInputElement> {}

const Switch: FC<SwitchParams> = ({ className, type, ...rest }) => {
  return (
    <label className="switch">
      <input className="switch_checkbox" type="checkbox" {...rest} />
      <span className="switch_background"></span>
      <span className="switch_slider"></span>
    </label>
  );
};

export default Switch;

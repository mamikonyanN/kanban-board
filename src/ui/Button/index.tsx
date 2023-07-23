import { ButtonHTMLAttributes, FC } from 'react';
import './button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: 'primary' | 'secondary';
  fill?: Boolean;
}

const Button: FC<ButtonProps> = ({ buttonStyle = 'primary', fill, className, ...rest }) => {
  let classes = 'button';
  classes += ` button__${buttonStyle}`;
  if (fill) classes += ' button__fill';
  if (className) className += ' ' + className;

  return <button className={classes} {...rest} />;
};

export default Button;

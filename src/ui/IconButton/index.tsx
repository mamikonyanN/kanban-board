import { ButtonHTMLAttributes, FC, FunctionComponent, SVGProps } from 'react';
import './iconButton.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  sm?: boolean;
}

const IconButton: FC<IconButtonProps> = ({ sm, Icon, className, ...attrs }) => {
  let classes = 'icon-button';
  if (sm) classes += ' icon-button__sm';
  if (className) classes += ' ' + className;

  return (
    <button className={classes} {...attrs}>
      <Icon className="icon-button_icon" />
    </button>
  );
};

export default IconButton;

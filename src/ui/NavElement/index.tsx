import { FC, HTMLProps } from 'react';
import './navElement.css';

interface NavElementProps extends HTMLProps<HTMLLIElement> {
  active?: boolean;
  primary?: boolean;
}

const NavElement: FC<NavElementProps> = ({ active, primary, className, ...rest }) => {
  let classes = 'nav-element';
  if (active) classes += ' nav-element__active';
  if (primary) classes += ' nav-element__primary';

  return <li className={classes} {...rest} />;
};

export default NavElement;

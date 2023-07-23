import { FC, HTMLProps } from 'react';
import './card.css';

export interface CardProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
  centered?: boolean;
  fillHeight?: boolean;
  clickable?: boolean;
}

const Card: FC<CardProps> = ({ size, muted, centered, fillHeight, clickable, className, ...rest }) => {
  let classes = 'card';
  if (size) classes += ' card__' + size;
  if (muted) classes += ' card__muted';
  if (centered) classes += ' card__centered';
  if (fillHeight) classes += ' card__fill-height';
  if (clickable) className += ' card__clickable';
  if (className) classes += ' ' + className;
  return <div className={classes} {...rest} />;
};

export default Card;

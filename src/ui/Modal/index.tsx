import Card from '@/ui/Card';
import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

type ModalProps = {
  children?: ReactNode;
  close: Function;
};

const Modal: FC<ModalProps> = ({ close, children }) => {
  const closeOnEsc = (event: KeyboardEvent) => event.key === 'Escape' && close();

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc, false);
    return () => document.removeEventListener('keydown', closeOnEsc, false);
  }, []);

  return createPortal(
    <div className="modal-overlay" onClick={() => close()}>
      <Card size="md" children={children} onClick={(e) => e.stopPropagation()} />
    </div>,
    document.getElementById('modal-portal')!
  );
};

export default Modal;

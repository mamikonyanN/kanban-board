import { RenameAbleEntity } from '@/types/misc';
import Button from '@/ui/Button';
import Modal from '@/ui/Modal';
import { FC } from 'react';

type DeleteModalProps = {
  close: Function;
  title: string;
  callback: (data: RenameAbleEntity) => void;
  data: RenameAbleEntity;
};

const DeletedModal: FC<DeleteModalProps> = ({ data, title, close, callback }) => {
  return (
    <Modal close={close}>
      <h2>{title}</h2>
      <h3>Are you sure?</h3>
      <Button fill onClick={() => callback(data)}>
        Confirm
      </Button>
    </Modal>
  );
};

export default DeletedModal;

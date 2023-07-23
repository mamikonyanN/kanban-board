import { RenameAbleEntity } from '@/types/misc';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Modal from '@/ui/Modal';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type SlimModalProps = {
  close: Function;

  title: string;
  callback: (data: RenameAbleEntity) => void;

  data?: RenameAbleEntity;
};

const SlimModal: FC<SlimModalProps> = ({ data = {}, title, close, callback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RenameAbleEntity>({ defaultValues: data });
  const { ref, ...rest } = register('title', { required: 'This field is required' });

  return (
    <Modal close={close}>
      <h2>{title}</h2>

      <form onSubmit={handleSubmit(callback)}>
        <Input
          {...rest}
          errors={errors.title}
          label="Title"
          placeholder="e.g. Our new project"
          ref={(element) => {
            ref(element);
            element?.focus();
          }}
        />

        <Button type="submit" fill>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default SlimModal;

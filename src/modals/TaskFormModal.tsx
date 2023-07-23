import { ReactComponent as DeleteIcon } from '@/assets/close_icon.svg';
import { boardsStore } from '@/store';
import { Column, Subtask, Task } from '@/types/board';
import Button from '@/ui/Button';
import IconButton from '@/ui/IconButton';
import Input from '@/ui/Input';
import Modal from '@/ui/Modal';
import Select from '@/ui/Select';
import Textarea from '@/ui/Textarea';
import { FC } from 'react';
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  useFieldArray,
  useForm,
} from 'react-hook-form';

type StatusIdObj = {
  statusId: string;
};

const getTitleInput = (register: UseFormRegister<Task & StatusIdObj>, errors: FieldErrors<Task & StatusIdObj>) => (
  <Input
    {...register('title', { required: 'Title is required' })}
    errors={errors.title}
    placeholder="Title"
    label="Title"
  />
);

const getDescriptionTextarea = (
  register: UseFormRegister<Task & StatusIdObj>,
  errors: FieldErrors<Task & StatusIdObj>
) => (
  <Textarea
    {...register('description', { required: 'Description is required' })}
    errors={errors.description}
    placeholder="Description"
    label="Description"
  />
);

const getSubtaskTitleInput = (
  register: UseFormRegister<Task & StatusIdObj>,
  errors: FieldErrors<Task & StatusIdObj>,
  index: number
) => (
  <Input
    {...register(`subtasks.${index}.title`, { required: 'Subtask title is required' })}
    placeholder="Subtask"
    errors={errors?.subtasks?.[index]?.title}
  />
);

const getSubtasksElements = (
  register: UseFormRegister<Task & StatusIdObj>,
  errors: FieldErrors<Task & StatusIdObj>,
  fields: FieldArrayWithId<Task & StatusIdObj, 'subtasks', 'id'>[],
  remove: UseFieldArrayRemove,
  append: UseFieldArrayAppend<Task & StatusIdObj, 'subtasks'>
) => (
  <>
    <label className="label">
      Subtask
      <div className="alert">{errors?.subtasks?.root?.message}</div>
      {fields.map((field, index) => (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} key={field.id}>
          {getSubtaskTitleInput(register, errors, index)}
          <div>
            <IconButton sm Icon={DeleteIcon} onClick={() => remove(index)} />
          </div>
        </div>
      ))}
    </label>
    <Button type="button" buttonStyle="secondary" fill onClick={() => append({ isDone: false } as Subtask)}>
      Add
    </Button>
  </>
);

const getStatusIdSelect = (
  register: UseFormRegister<Task & StatusIdObj>,
  errors: FieldErrors<Task & StatusIdObj>,
  statuses: Column[]
) => (
  <Select
    {...register('statusId', { required: 'Status is required' })}
    errors={errors.statusId}
    label="Status"
    options={statuses}
    valueField="id"
  />
);

type TaskFormModalProps = {
  close: Function;

  title: string;
  callback: (data: Task & StatusIdObj) => void;

  data?: Task & StatusIdObj;
};

const TaskFormModal: FC<TaskFormModalProps> = ({ data = {}, title, close, callback }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task & StatusIdObj>({ defaultValues: data });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
    keyName: 'id',
    rules: {
      required: { value: true, message: 'At least one is required' },
    },
  });

  const statuses = boardsStore((state) => Object.values(state.boards[state.selectedBoardId!].columns));

  return (
    <Modal close={close}>
      <h2>{title}</h2>

      <form onSubmit={handleSubmit(callback)}>
        {getTitleInput(register, errors)}
        {getDescriptionTextarea(register, errors)}
        {getSubtasksElements(register, errors, fields, remove, append)}
        {getStatusIdSelect(register, errors, statuses)}
        <Button type="submit" fill>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default TaskFormModal;

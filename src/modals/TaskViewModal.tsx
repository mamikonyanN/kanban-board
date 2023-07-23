import { ReactComponent as DeleteIcon } from '@/assets/close_icon.svg';
import { ReactComponent as EditIcon } from '@/assets/edit_icons.svg';
import { boardsStore } from '@/store';
import { modalStore } from '@/store/modalStore';
import { Task } from '@/types/board';
import { ModalType, ModalCallback } from '@/types/misc';
import IconButton from '@/ui/IconButton';
import Modal from '@/ui/Modal';
import Select from '@/ui/Select';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';

type TaskViewModalProps = {
  close: Function;
  data: {
    taskId: string;
    columnId: string;
  };
};

const TaskViewModal: FC<TaskViewModalProps> = ({ data: { taskId, columnId }, close }) => {
  const [statusId, setStatusId] = useState(columnId);

  const statuses = boardsStore((state) => Object.values(state.boards[state.selectedBoardId!].columns));
  const task = boardsStore((state) => state.boards[state.selectedBoardId!].columns[statusId].tasks[taskId]);

  const openModal = modalStore((state) => state.openModal);
  const closeModal = modalStore((state) => state.closeModal);

  const toggleSubtask = boardsStore((state) => state.toggleSubtask);
  const changeTaskStatus = boardsStore((state) => state.changeTaskStatus);
  const updateTask = boardsStore((state) => state.updateTask);
  const deleteTask = boardsStore((state) => state.deleteTask);

  const countAll = task.subtasks.length;
  const countDone = task.subtasks.filter((subtask) => subtask.isDone).length;

  toggleSubtask;

  const onStatusIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changeTaskStatus(taskId, statusId, event.target.value);
    setStatusId(event.target.value);
  };

  function openEditModal(event: MouseEvent) {
    event.stopPropagation();
    openModal({
      type: ModalType.taskForm,
      callback: submitTaskUpdate as ModalCallback,
      title: 'Edit task',
      data: {
        ...task,
        statusId: columnId,
      },
    });
  }

  function submitTaskUpdate(data: Task & { statusId: string }) {
    updateTask(data, columnId);
    closeModal();
  }

  function openDeleteModal(event: MouseEvent) {
    event.stopPropagation();
    openModal({
      type: ModalType.delete,
      callback: submitColumnDeletion as ModalCallback,
      title: `Delete task "${task.title}"`,
      data: task,
    });
  }

  function submitColumnDeletion(data: Task) {
    deleteTask(data.id, columnId);
    closeModal();
  }

  return (
    <Modal close={close}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h2 style={{ flexGrow: '1' }}>{task.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <IconButton sm Icon={EditIcon} onClick={openEditModal} />
          </div>
          <div>
            <IconButton sm Icon={DeleteIcon} onClick={openDeleteModal} />
          </div>
        </div>
      </div>

      <p className="text__secondary">{task.description}</p>

      <h4>
        Subtasks ({countDone} of {countAll})
      </h4>

      {task.subtasks.map((subtask, index) => (
        <label className="temp" key={index}>
          <input type="checkbox" checked={subtask.isDone} onClick={() => toggleSubtask(task, statusId, index)} />
          <span>{subtask.title}</span>
        </label>
      ))}

      <Select value={statusId} label="Status" options={statuses} valueField="id" onChange={onStatusIdChange} />
    </Modal>
  );
};

export default TaskViewModal;

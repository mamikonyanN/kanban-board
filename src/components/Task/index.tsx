import { modalStore } from '@/store/modalStore';
import { Task as TaskType } from '@/types/board';
import { ModalType } from '@/types/misc';
import Card, { CardProps } from '@/ui/Card';
import { FC } from 'react';
import './task.css';

interface TaskProps extends CardProps {
  task: TaskType;
  columnId: string;
}

const Task: FC<TaskProps> = ({ task, columnId, ...attrs }) => {
  const countAll = task.subtasks.length;
  const countDone = task.subtasks.filter((subtask) => subtask.isDone).length;

  const openModal = modalStore((state) => state.openModal);

  function openModalTaskView() {
    openModal({
      type: ModalType.taskView,
      title: undefined,
      callback: () => ({}),
      data: {
        taskId: task.id,
        columnId,
      },
    });
  }

  return (
    <Card size="sm" clickable className="task" onClick={openModalTaskView} {...attrs}>
      <div className="task_title">{task.title}</div>
      <div className="task_count">
        {countDone} of {countAll} subtasks
      </div>
    </Card>
  );
};

export default Task;

import { ReactComponent as DeleteIcon } from '@/assets/close_icon.svg';
import { ReactComponent as EditIcon } from '@/assets/edit_icons.svg';
import { boardsStore } from '@/store';
import { modalStore } from '@/store/modalStore';
import { Column as ColumnType, Task as TaskType } from '@/types/board';
import { ModalCallback, ModalType } from '@/types/misc';
import Card from '@/ui/Card';
import IconButton from '@/ui/IconButton';
import { DragEvent, FC, useState } from 'react';
import Task from '../Task';
import './column.css';

type ColumnProps = {
  column: ColumnType;
};

const Column: FC<ColumnProps> = ({ column }) => {
  const tasks = Object.values(column.tasks);

  const renameColumn = boardsStore((state) => state.renameColumn);
  const deleteColumn = boardsStore((state) => state.deleteColumn);
  const createTask = boardsStore((state) => state.createTask);

  const changeTaskStatus = boardsStore((state) => state.changeTaskStatus);

  const openModal = modalStore((state) => state.openModal);
  const closeModal = modalStore((state) => state.closeModal);

  function openModalRenameColumn() {
    openModal({
      type: ModalType.slim,
      title: `Rename column "${column.title}"`,
      callback: renameColumnCallback as ModalCallback,
      data: column,
    });
  }

  function renameColumnCallback(data: ColumnType) {
    renameColumn(data.id, data.title);
    closeModal();
  }

  function openModalDeleteColumn() {
    openModal({
      type: ModalType.delete,
      title: `Delete column "${column.title}"`,
      callback: deleteColumnCallback as ModalCallback,
      data: column,
    });
  }

  function deleteColumnCallback(data: ColumnType) {
    deleteColumn(data.id);
    closeModal();
  }

  function openModalCreateTask() {
    openModal({
      type: ModalType.taskForm,
      title: 'Create new task',
      callback: createTaskCallback as ModalCallback,
      data: { statusId: column.id },
    });
  }

  function createTaskCallback(data: TaskType) {
    createTask(data.title, data.description, column.id, data.subtasks);
    closeModal();
  }

  const [isDraggedAbove, setDraggedAbove] = useState<Boolean>(false);

  function onTaskDrag(event: DragEvent, taskId: string) {
    event.dataTransfer.setData('taskId', taskId);
    event.dataTransfer.setData('oldColumnId', column.id);
  }

  function onColumnDrop(event: DragEvent) {
    const taskId = event.dataTransfer.getData('taskId') as string;
    const oldColumnId = event.dataTransfer.getData('oldColumnId') as string;
    const newColumnId = column.id;
    if (oldColumnId === newColumnId) return;
    changeTaskStatus(taskId, oldColumnId, newColumnId);
    setDraggedAbove(false);
  }

  function onColumnDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onColumnDragEnter(event: DragEvent) {
    if ((event.dataTransfer.getData('oldColumnId') as string) !== column.id) setDraggedAbove(true);
  }

  function onColumnDragLeave(event: DragEvent) {
    setDraggedAbove(false);
  }

  return (
    <div
      className={'column' + (isDraggedAbove && ' column__dragged-over')}
      onDrop={onColumnDrop}
      onDragOver={onColumnDragOver}
      onDragEnter={onColumnDragEnter}
      onDragLeave={onColumnDragLeave}
    >
      <div className="column_title">
        {column.title}
        <span className="column_count">({tasks.length})</span>
        <span className="column_actions">
          <IconButton sm Icon={EditIcon} onClick={openModalRenameColumn} />
          <IconButton sm Icon={DeleteIcon} onClick={openModalDeleteColumn} />
        </span>
      </div>

      <div className="column_tasks-wrapper">
        {tasks.map((task) => (
          <Task key={task.id} task={task} columnId={column.id} draggable onDragStart={(e) => onTaskDrag(e, task.id)} />
        ))}

        <Card size="sm" muted centered clickable onClick={openModalCreateTask}>
          + Add New Task
        </Card>
      </div>
    </div>
  );
};

export default Column;

import { Board, Column, Map, Subtask, Task } from '@/types/board';
import { v4 } from 'uuid';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

function initBoard(title: string): Board {
  return {
    id: v4(),
    title,
    columns: {},
  };
}

function initColumn(title: string): Column {
  return {
    id: v4(),
    title,
    tasks: {},
  };
}

function initTask(title: string, description: string, subtasks: Subtask[]): Task {
  return {
    id: v4(),
    title,
    description,
    subtasks,
  };
}

interface BoardsState {
  boards: Map<Board>;
  selectedBoardId: string | null;

  selectBoard: (id: string) => void;

  createBoard: (title: string) => void;
  renameBoard: (id: string, title: string) => void;
  deleteBoard: (id: string) => void;

  createColumn: (title: string) => void;
  renameColumn: (id: string, title: string) => void;
  deleteColumn: (id: string) => void;

  createTask: (title: string, description: string, statusId: string, subtasks: Subtask[]) => void;
  updateTask: (task: Task & { statusId: string }, columnId: string) => void;
  deleteTask: (taskId: string, columnId: string) => void;

  toggleSubtask: (task: Task, statusId: string, subtaskIndex: number) => void;
  changeTaskStatus: (taskId: string, oldStatusId: string, newStatusId: string) => void;
}

export const boardsStore = create<BoardsState>()(
  persist(
    devtools(
      immer((set) => ({
        boards: {},
        selectedBoardId: null,

        selectBoard: (id) => {
          set((state) => {
            state.selectedBoardId = id;
          });
        },

        createBoard: (title) => {
          set((state) => {
            const board = initBoard(title);

            const todoColumn = initColumn('Todo');
            const doingColumn = initColumn('Doing');
            const doneColumn = initColumn('Done');

            board.columns[todoColumn.id] = todoColumn;
            board.columns[doingColumn.id] = doingColumn;
            board.columns[doneColumn.id] = doneColumn;

            state.boards[board.id] = board;
          });
        },
        renameBoard: (id, title) => {
          set((state) => {
            state.boards[id].title = title;
          });
        },
        deleteBoard: (id) => {
          set((state) => {
            delete state.boards[id];
          });
        },

        createColumn: (title) => {
          set((state) => {
            const column = initColumn(title);
            state.boards[state.selectedBoardId!].columns[column.id] = column;
          });
        },
        renameColumn: (id, title) => {
          set((state) => {
            state.boards[state.selectedBoardId!].columns[id].title = title;
          });
        },
        deleteColumn: (id) => {
          set((state) => {
            delete state.boards[state.selectedBoardId!].columns[id];
          });
        },

        createTask: (title, description, statusId, subtasks) => {
          set((state) => {
            const task = initTask(title, description, subtasks);
            state.boards[state.selectedBoardId!].columns[statusId].tasks[task.id] = task;
          });
        },
        updateTask: (task, columnId) => {
          set((state) => {
            state.boards[state.selectedBoardId!].columns[columnId].tasks[task.id] = task;
            if (task.statusId !== columnId) {
              delete state.boards[state.selectedBoardId!].columns[columnId].tasks[task.id];
              state.boards[state.selectedBoardId!].columns[task.statusId].tasks[task.id] = task;
            }
          });
        },
        deleteTask: (taskId, columnId) => {
          set((state) => {
            delete state.boards[state.selectedBoardId!].columns[columnId].tasks[taskId];
          });
        },

        toggleSubtask: (task, statusId, subtaskIndex) => {
          set((state) => {
            state.boards[state.selectedBoardId!].columns[statusId].tasks[task.id].subtasks[subtaskIndex].isDone =
              !state.boards[state.selectedBoardId!].columns[statusId].tasks[task.id].subtasks[subtaskIndex].isDone;
          });
        },
        changeTaskStatus: (taskId, oldStatusId, newStatusId) => {
          set((state) => {
            const task = state.boards[state.selectedBoardId!].columns[oldStatusId].tasks[taskId];
            delete state.boards[state.selectedBoardId!].columns[oldStatusId].tasks[taskId];
            state.boards[state.selectedBoardId!].columns[newStatusId].tasks[taskId] = task;
          });
        },
      }))
    ),
    { name: 'boards' }
  )
);

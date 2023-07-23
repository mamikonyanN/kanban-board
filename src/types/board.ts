export interface Board {
  id: string;
  title: string;
  columns: Map<Column>;
}

export interface Column {
  id: string;
  title: string;
  tasks: Map<Task>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isDone: boolean;
}

export type Map<T> = {
  [id: string]: T;
};

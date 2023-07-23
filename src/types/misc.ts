export enum ModalType {
  slim,
  delete,
  taskForm,
  taskView,
}

export type ModalCallback = (data: Object) => void;

export interface RenameAbleEntity {
  id: string;
  title: string;
}

import { ModalType, ModalCallback } from '@/types/misc';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type openModalFunctionProps = {
  type: ModalType;
  callback: ModalCallback;
  data?: Object;
  title?: string;
};

type ModalState = {
  isOpen: boolean;

  openModal: (props: openModalFunctionProps) => void;
  closeModal: () => void;

  modalType: ModalType | null;
  modalTitle: string | null;
  modalCallback: ModalCallback | null;
  modalData: Object | null;
};

export const modalStore = create<ModalState>()(
  devtools(
    immer((set) => ({
      isOpen: false,

      openModal: ({ type, callback, data, title }) =>
        set((state) => {
          state.isOpen = true;
          state.modalType = type;
          state.modalCallback = callback;
          if (data) state.modalData = data;
          if (title) state.modalTitle = title;
        }),
      closeModal: () =>
        set((state) => {
          state.isOpen = false;
          state.modalType = null;
          state.modalData = null;
          state.modalCallback = null;
          state.modalTitle = null;
        }),

      modalType: null,
      modalTitle: null,
      modalCallback: null,
      modalData: null,
    }))
  )
);

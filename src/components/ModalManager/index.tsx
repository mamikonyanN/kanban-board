import DeletedModal from '@/modals/DeleteModal';
import SlimModal from '@/modals/SlimModal';
import TaskFormModal from '@/modals/TaskFormModal';
import TaskViewModal from '@/modals/TaskViewModal';
import { modalStore } from '@/store/modalStore';
import { Task } from '@/types/board';
import { ModalType, RenameAbleEntity } from '@/types/misc';
import { useEffect } from 'react';

const ModalManager = () => {
  const isOpen = modalStore((state) => state.isOpen);
  const modalTitle = modalStore((state) => state.modalTitle);
  const modalType = modalStore((state) => state.modalType);
  const modalData = modalStore((state) => state.modalData);

  const closeModal = modalStore((state) => state.closeModal);
  const modalCallback = modalStore((state) => state.modalCallback);

  useEffect(
    () =>
      modalStore.subscribe((state) => {
        if (state.isOpen) document.body.classList.add('body__modal');
        else document.body.classList.remove('body__modal');
      }),
    []
  );

  if (!isOpen) return;

  return (
    <>
      {modalType === ModalType.slim && (
        <SlimModal
          callback={modalCallback!}
          title={modalTitle!}
          close={closeModal}
          data={modalData! as RenameAbleEntity}
        />
      )}
      {modalType === ModalType.delete && (
        <DeletedModal
          callback={modalCallback!}
          title={modalTitle!}
          close={closeModal}
          data={modalData! as RenameAbleEntity}
        />
      )}
      {modalType === ModalType.taskForm && (
        <TaskFormModal
          callback={modalCallback!}
          title={modalTitle!}
          close={closeModal}
          data={modalData! as Task & { statusId: string }}
        />
      )}
      {modalType === ModalType.taskView && (
        <TaskViewModal close={closeModal} data={modalData as { taskId: string; columnId: string }} />
      )}
    </>
  );
};

export default ModalManager;

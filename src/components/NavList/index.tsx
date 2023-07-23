import { ReactComponent as BoardIcon } from '@/assets/board_icon.svg';
import { ReactComponent as DeleteIcon } from '@/assets/close_icon.svg';
import { ReactComponent as EditIcon } from '@/assets/edit_icons.svg';
import { boardsStore } from '@/store';
import { modalStore } from '@/store/modalStore';
import { Board } from '@/types/board';
import { ModalCallback, ModalType } from '@/types/misc';
import IconButton from '@/ui/IconButton';
import NavElement from '@/ui/NavElement';
import { MouseEvent } from 'react';
import './navList.css';

const NavList = () => {
  const boards = boardsStore((state) => Object.values(state.boards));
  const currentlyActive = boardsStore((state) => state.selectedBoardId);

  const selectBoard = boardsStore((state) => state.selectBoard);
  const renameBoard = boardsStore((state) => state.renameBoard);
  const deleteBoard = boardsStore((state) => state.deleteBoard);
  const createBoard = boardsStore((state) => state.createBoard);

  const openModal = modalStore((state) => state.openModal);
  const closeModal = modalStore((state) => state.closeModal);

  function openModalCreateBoard() {
    openModal({
      type: ModalType.slim,
      title: 'Create new board',
      callback: createBoardCallback as ModalCallback,
    });
  }

  function createBoardCallback(data: Board) {
    createBoard(data.title);
    closeModal();
  }

  function openModalRenameBoard(event: MouseEvent, data: Board) {
    event.stopPropagation();
    openModal({
      type: ModalType.slim,
      title: `Rename board "${data.title}"`,
      callback: renameBoardCallback as ModalCallback,
      data,
    });
  }

  function renameBoardCallback(data: Board) {
    renameBoard(data.id, data.title);
    closeModal();
  }

  function openModalDeleteBoard(event: MouseEvent, data: Board) {
    event.stopPropagation();
    openModal({
      type: ModalType.delete,
      title: `Delete board "${data.title}"`,
      callback: deleteBoardCallback as ModalCallback,
      data,
    });
  }

  function deleteBoardCallback(data: Board) {
    deleteBoard(data.id);
    closeModal();
  }

  return (
    <nav className="nav-list">
      <div className="nav-list_title">All boards ({boards.length})</div>
      <ul>
        {boards.map((board) => (
          <NavElement active={board.id === currentlyActive} key={board.id} onClick={() => selectBoard(board.id)}>
            <BoardIcon className="nav-item_icon" />

            <div className="nav-item_title" title={board.title}>
              {board.title}
            </div>

            <IconButton sm Icon={EditIcon} onClick={(event) => openModalRenameBoard(event, board)} />
            <IconButton sm Icon={DeleteIcon} onClick={(event) => openModalDeleteBoard(event, board)} />
          </NavElement>
        ))}

        <NavElement primary onClick={openModalCreateBoard}>
          <BoardIcon className="nav-item_icon" />
          <div className="nav-item_title">+ Create New Board</div>
        </NavElement>
      </ul>
    </nav>
  );
};

export default NavList;

import Column from '@/components/Column';
import { boardsStore } from '@/store';
import { modalStore } from '@/store/modalStore';
import { Column as ColumnType } from '@/types/board';
import { ModalCallback, ModalType } from '@/types/misc';
import Card from '@/ui/Card';
import { FC } from 'react';
import './board.css';

const Board: FC = () => {
  const board = boardsStore((state) => state.boards[state.selectedBoardId!]);

  const createColumn = boardsStore((state) => state.createColumn);

  const openModal = modalStore((state) => state.openModal);
  const closeModal = modalStore((state) => state.closeModal);

  if (!board) return <h1 className="board">Choose or create board</h1>;

  function openModalCreateColumn() {
    openModal({
      type: ModalType.slim,
      title: 'Create new column',
      callback: createColumnCallback as ModalCallback,
    });
  }

  function createColumnCallback(data: ColumnType) {
    createColumn(data.title);
    closeModal();
  }

  return (
    <main className="board">
      {Object.values(board.columns).map((column) => (
        <Column column={column} key={column.id} />
      ))}

      <div className="board_untitled-column">
        <Card size="sm" muted centered fillHeight clickable onClick={openModalCreateColumn}>
          + Add New Column
        </Card>
      </div>
    </main>
  );
};

export default Board;

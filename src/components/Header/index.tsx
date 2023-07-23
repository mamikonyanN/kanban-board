import { ReactComponent as MenuIcon } from '@/assets/menu_icon.svg';
import { boardsStore, settingsStore } from '@/store';
import IconButton from '@/ui/IconButton';
import { FC } from 'react';
import './header.css';

const Header: FC = () => {
  const boardName = boardsStore((state) => state.boards[state.selectedBoardId!]?.title);

  const toggleSidebar = settingsStore((state) => state.toggleSidebar);

  return (
    <header className="header">
      <div className="header_logo">
        <div className="header__toggle">
          <IconButton Icon={MenuIcon} onClick={() => toggleSidebar()} />
        </div>
        <img className="logo" src="/kanban.svg" alt="logo" />
        <div className="logo_title">kanban</div>
      </div>
      <div className="header_elements">
        <div className="board-title">{boardName ?? 'Not selected'}</div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;

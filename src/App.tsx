import Board from '@/components/Board';
import Header from '@/components/Header';
import ModalManager from '@/components/ModalManager';
import Sidebar from '@/components/Sidebar';

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Board />
      <ModalManager />
    </>
  );
}

export default App;

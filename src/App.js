import React from 'react';
import Board from './components/Board';
import Options from './components/Options';

const App = () => {
  return (
    <div className='app'>
      <div className='app__header'>Matching Cards</div>
      <Options />
      <Board />
    </div>
  );
};

export default App;

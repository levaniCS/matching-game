import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from './Card';
import * as actions from '../redux/actions/board';

const Board = () => {
  const openedCards = useSelector((state) => state.board.openedFrameworks);
  const finalList = useSelector((state) => state.board.finalizedFrameworks);
  const isEnd = useSelector((state) => state.board.isEnd);
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (name, index) => {
      dispatch(actions.handleFirstClick(name, index));
    },
    [dispatch]
  );

  useEffect(() => {
    if (openedCards.length === 2) {
      setTimeout(() => {
        dispatch(actions.checkEquality());
      }, 800);
    }
  }, [dispatch, openedCards]);

  let isStarted = <h1 className='message'>Play Again</h1>;

  return (
    <div className='playground'>
      {!isEnd
        ? finalList.map((framework, index) => {
            return (
              <Card
                key={index}
                framework={framework.name}
                click={() => {
                  handleClick(framework.name, index);
                }}
                close={framework.close}
                complete={framework.complete}
              />
            );
          })
        : isStarted}
    </div>
  );
};
export default Board;

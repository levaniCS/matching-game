import React, { useEffect, useReducer, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/board';
import Stopwatch from './Stopwatch';

const reducer = (currentState, newState) => {
  return { ...currentState, ...newState };
};

const Options = () => {
  const finalList = useSelector((state) => state.board.finalizedFrameworks);
  const isEnd = useSelector((state) => state.board.isEnd);

  const dispatch = useDispatch();
  const isStarted = finalList.length !== 0;

  const [{ running, lapse }, setState] = useReducer(reducer, {
    running: false,
    lapse: 0
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isEnd) {
      clearInterval(intervalRef.current);
    }
  }, [isEnd]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startGameHandler = () => {
    dispatch(actions.setCards());
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        setState({ lapse: Date.now() - startTime });
      }, 0);
    }
    setState({ running: !running });
  };

  const resetGameHandler = () => {
    clearInterval(intervalRef.current);
    setState({ lapse: 0, running: false });
    dispatch(actions.resetGame());
  };

  return (
    <div className='options'>
      <Stopwatch lapse={lapse} />
      <button
        className={`options__btn ${isStarted ? 'disabled' : null}`}
        onClick={startGameHandler}
        disabled={isStarted}>
        START
      </button>
      <button
        className={`options__btn ${!isStarted ? 'disabled' : null}`}
        disabled={!isStarted}
        onClick={resetGameHandler}>
        RESET
      </button>
    </div>
  );
};

export default Options;

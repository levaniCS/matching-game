export const SET_CARDS = 'SET_CARDS';
export const HANDLE_CARD_CLICK = 'HANDLE_CARD_CLICK';
export const CHECK_EQUALITY = 'CHECK_EQUALITY';
export const RESET_GAME = 'RESET_GAME';

export const setCards = () => {
  return {
    type: SET_CARDS,
    shuffle: shuffleCards
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME
  };
};

export const handleFirstClick = (name, index) => {
  return {
    type: HANDLE_CARD_CLICK,
    name,
    index
  };
};

export const checkEquality = () => {
  return {
    type: CHECK_EQUALITY
  };
};
/// its not action
export const shuffleCards = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

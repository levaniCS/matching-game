import {
  SET_CARDS,
  HANDLE_CARD_CLICK,
  CHECK_EQUALITY,
  RESET_GAME
} from '../actions/board';

const INITIAL_STATE = {
  frameworks: [
    'angular2',
    'vue',
    'react',
    'grunt',
    'phantomjs',
    'ember',
    'babel',
    'ionic',
    'gulp',
    'meteor',
    'yeoman',
    'yarn',
    'nodejs',
    'bower',
    'browserify'
  ],
  duplicatedFrameworks: [],
  randomizedFrameworks: [],
  finalizedFrameworks: [],
  openedFrameworks: [],
  isEnd: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...INITIAL_STATE,
        isEnd: true
      };
    case HANDLE_CARD_CLICK:
      //თუ პირველი გახსნაა
      const index = action.index;
      const framework = {
        name: action.name,
        index: index
      };

      let finalsList = [...state.finalizedFrameworks]; // აკოპირებს გამოცნობილებს
      let frameworks = [...state.openedFrameworks]; // აკოპირებს გახსნილებს სულ

      finalsList[index].close = false; // ეს ფრეიმვორკი გახსნილია classname="opened"
      frameworks.push(framework); //გახსნილ ფრეიმვორკებში ამატებს ამ არჩეულს
      return {
        //ამ ცვლილებებით ცვლის სტეიტს
        ...state,
        openedFrameworks: frameworks,
        finalizedFrameworks: finalsList
      };
    case SET_CARDS:
      let finalizedFrameworks = []; // სსაბოლოო
      let duplicatedFrameworks = state.frameworks.concat(state.frameworks); // ვაკეთებთ წყვილებს
      let randomizedFrameworks = action.shuffle(duplicatedFrameworks); // აურიოს
      randomizedFrameworks.map((name) => {
        return finalizedFrameworks.push({
          name,
          close: true,
          complete: false
        });
      });
      return {
        ...state,
        isEnd: false,
        randomizedFrameworks: randomizedFrameworks,
        finalizedFrameworks: finalizedFrameworks,
        duplicatedFrameworks: duplicatedFrameworks
      };
    case CHECK_EQUALITY:
      let finalFrameworks = [...state.finalizedFrameworks]; // აკოპირებს გამოცნობილებს

      if (
        //თუ ფრეიმვორკების სახელები ემთხვევა დაა ისინი სხვადასხვა პოზიციაზეე არიააან
        state.openedFrameworks[0].name &&
        state.openedFrameworks[0].name === state.openedFrameworks[1].name &&
        state.openedFrameworks[0].index !== state.openedFrameworks[1].index
      ) {
        finalFrameworks[state.openedFrameworks[0].index].complete = true; // classname=" matched"
        finalFrameworks[state.openedFrameworks[1].index].complete = true; // classname=" matched"
      } else {
        //თუ მათი სახელები არ ემთხვევაა ორივეს კლასნეიმში 'opened' იცვლება ''-თ
        finalFrameworks[state.openedFrameworks[0].index].close = true;
        finalFrameworks[state.openedFrameworks[1].index].close = true;
      }

      const isEnd =
        finalFrameworks.length === 0 ||
        finalFrameworks.every((item) => {
          return item.complete === true;
        });

      return {
        ...state,
        isEnd: isEnd,
        finalizedFrameworks: finalFrameworks,
        openedFrameworks: []
      };
    default:
      return state;
  }
};

export default reducer;

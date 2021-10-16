import { SAVESEARCHRESULT } from "./SearchResultActions";

const INITIAL_STATE = {
  searchResult: null
};



const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVESEARCHRESULT:
      return {
        ...state,
        searchResult: action.data,
      };

    default:
      return state;
  }
};

export default reducer;

import { BOOKDATA, AUDIOBOOKDATA, SAVESEARCHRESULT, TOGGLESEARCH } from "./HomeActions";

const INITIAL_STATE = {
  count: 0,
  similarity: null,
  searchOptions: null,
  audiobookData: null,
  loading: true,
  searchResult: null,
  index: null,
  openSearch: false
};

const getBookNames = (books) => {
  const bookNames = books.map((book) => {
    return { uuid: book.uuid, title: book.title };
  });

  return bookNames;
};

const normalizeAudiobooks = (books) =>
  books.reduce((acc, c) => {
    acc[c.uuid] = c;
    return acc;
  }, {});

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKDATA:
      return {
        ...state,
        searchOptions: action.data
      };

    case AUDIOBOOKDATA:
      return {
        ...state,
        audiobookData: normalizeAudiobooks(action.data),
        loading: false
      };

    case SAVESEARCHRESULT:
      console.log(action.data)
      return {
        ...state,
        searchResult: state.audiobookData[action.data.uuid],
        index: action.data.index,
        openSearch: true
      };
      
      case TOGGLESEARCH:
      return {
        ...state,
        openSearch: false
      };

    default:
      return state;
  }
};

export default reducer;

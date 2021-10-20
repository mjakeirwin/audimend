import {
  BOOKDATA,
  AUDIOBOOKDATA,
  SAVESEARCHRESULT,
  TOGGLESEARCH,
  SEARCHBOOKS,
  ERRORSEARCHBOOKS,
  CREATEBOOKGRID,
} from "./HomeActions";

const INITIAL_STATE = {
  count: 0,
  similarity: null,
  searchOptions: null,
  audiobookData: null,
  loading: true,
  searchResult: null,
  emptySearch: null,
  index: null,
  openSearch: false,
  bookGrid: null,
  createGrid: false,
  loadingSearch: true,
  searchTitle: null
};

const normalizeAudiobooks = (books) =>
  books.reduce((acc, c) => {
    acc[c.uuid] = c;
    return acc;
  }, {});

/* 
  searchResult: state.audiobookData[action.data.uuid],
  index: action.data.index,
  openSearch: true,
  bookGrid: createGrid(
    state.audiobookData,
    state.searchOptions,
    action.data.index
  ),
 */
const createGrid = (audiobooks, searchOptions, index) => {
  let indexArray = [];
  let bookGrid = [];
  let low = Number(index) - 4;
  let high = Number(index) + 5;
  index = Number(index);
  let abslow = Math.abs(low);

  console.log("reducer creating grid", index, audiobooks);

  if (low < 0) {
    low = 0;
    high = high + abslow;
  }

  for (var i = low; i <= high; i++) {
    if (i !== Number(index)) {
      indexArray.push(i);
    }
  }

  indexArray.forEach((element) =>
    bookGrid.push(audiobooks[searchOptions[element].uuid])
  );

  console.log("bookgrid", bookGrid);

  return bookGrid;
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKDATA:
      return {
        ...state,
        searchOptions: action.data,
        loading: false,
      };

    case AUDIOBOOKDATA:
      return {
        ...state,
        audiobookData: normalizeAudiobooks(action.data),
        createGrid: true,
      };

    case SAVESEARCHRESULT:
      return {
        ...state,
        index: action.data.index,
        searchResult: action.data[0].uuid,
        openSearch: true,
      };

    case TOGGLESEARCH:
      return {
        ...state,
        openSearch: false,
      };

    case ERRORSEARCHBOOKS:
      return {
        ...state,
        emptySearch: true,
      };

    case SEARCHBOOKS:
      return {
        ...state,
        index: action.data[0].index,
        searchResult: action.data[0].uuid,
        searchTitle: action.data[0].title,
        openSearch: true,
        loadingSearch: true,
      };
    case CREATEBOOKGRID:
      return {
        ...state,
        createGrid: false,
        loadingSearch: false,
        bookGrid: createGrid(
          action.data.audiobooks,
          action.data.searchOptions,
          action.data.index
        ),
      };

    default:
      return state;
  }
};

export default reducer;

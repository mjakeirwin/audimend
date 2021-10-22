import {
  BOOKDATA,
  AUDIOBOOKDATA,
  SAVESEARCHRESULT,
  TOGGLESEARCH,
  SEARCHBOOKS,
  ERRORSEARCHBOOKS,
  CREATEBOOKGRID,
  CHANGEBOOK,
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
  searchTitle: null,
  updateAudiobooks: false,
};

const normalizeAudiobooks = (books) =>
  books.reduce((acc, c) => {
    acc[c.uuid] = c;
    return acc;
  }, {});

const createGrid = (audiobooks, searchOptions, index, prevbookGrid) => {
  let indexArray = [];
  let bookGrid = [];
  let low = Number(index) - 6;
  let high = Number(index) + 7;
  index = Number(index);
  let abslow = Math.abs(low);

  if (low < 0) {
    low = 0;
    high = high + abslow;
  }

  for (var i = low; i <= high; i++) {
    if (i !== Number(index)) {
      indexArray.push(i);
    }
  }

  indexArray.forEach((element) => {
    if (index - 1 !== element) {
      bookGrid.push(audiobooks[searchOptions[element].uuid]);
    }
  });

  console.log("bookgrid", bookGrid, "prevbookgrid", prevbookGrid);

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
        updateAudiobooks: false,
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
        updateAudiobooks: true,
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
    case CHANGEBOOK:
      return {
        ...state,
        index: action.data.book.index,
        searchResult: action.data.book.uuid,
        searchTitle: action.data.book.title,
        bookGrid: createGrid(
          action.data.audiobooks,
          action.data.searchOptions,
          action.data.book.index,
          state.bookGrid
        ),
      };

    default:
      return state;
  }
};

export default reducer;

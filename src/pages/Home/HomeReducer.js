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
  indexBounds: null,
};

const RANGE = 30


const normalizeAudiobooks = (books) =>
  books.reduce((acc, c) => {
    acc[c.uuid] = c;
    return acc;
  }, {});

const normalizeBookgrid = (books) =>
  books.reduce((acc, c) => {
    acc[c.book.uuid] = c;
    return acc;
  }, {});

const createGrid = (audiobooks, searchOptions, index, prevbookGrid) => {
  let indexArray = [];
  var bookGrid = [];
  var tempArray = [];
  var bookDict = {};
  let low = Number(index) - 5;
  let high = Number(index) + 5;
  index = Number(index);
  let abslow = Math.abs(low);

  if (prevbookGrid) {
    var compareGrid = normalizeBookgrid(prevbookGrid);
    console.log("NORMALIZING", compareGrid);
  }

  if (low < 0) {
    low = 0;
    high = high + abslow;
  }

  for (var i = low; i <= high; i++) {
    if (i !== Number(index)) {
      indexArray.push(i);
    }
  }
  let gridIndex = 0;
  console.log(indexArray);
  indexArray.forEach((element) => {
    if (index - 1 !== element) {
      if (compareGrid) {
        if (
          compareGrid[searchOptions[element].uuid] &&
          compareGrid[searchOptions[element].uuid].gridIndex !== gridIndex
        ) {
          let prevGridIndex =
            compareGrid[searchOptions[element].uuid].gridIndex;

          bookDict[prevGridIndex] = {
            book: compareGrid[searchOptions[element].uuid].book,
            gridIndex: prevGridIndex,
          };
        } else {
          console.log("ADDING TO TEMP");
          tempArray.push({
            book: audiobooks[searchOptions[element].uuid],
            gridIndex: 1,
          });
        }
      } else {
        bookGrid.push({
          book: audiobooks[searchOptions[element].uuid],
          gridIndex: gridIndex,
        });
        gridIndex += 1;
      }
    }
  });

  if (compareGrid) {
    console.log("run this code");
    tempArray.forEach((book) => {
      for (var h = 0; h <= 8; h++) {
        if (!(h in bookDict)) {
          console.log("MISSING");
          bookDict[h] = book;
          break;
        }
      }
    });

    console.log("DICT", bookDict);
    for (var s = 0; s <= 8; s++) {
      bookDict[s]["gridIndex"] = s;
    }

    for (var j = 0; j <= 8; j++) {
      bookGrid.push(bookDict[j]);
    }
  }

  console.log(
    "bookgrid",
    bookGrid,
    "prevbookgrid",
    prevbookGrid,
    "tempArray",
    tempArray
  );

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
        audiobookData: normalizeAudiobooks(action.data.res),
        createGrid: true,
        index: action.data.index,
        indexBounds: {
          indexHigh: Number(action.data.index) + RANGE,
          indexLow: Number(action.data.index) - RANGE,
        },
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
        indexBounds: {
          indexHigh: Number(action.data[0].index) + RANGE,
          indexLow: Number(action.data[0].index) - RANGE,
        },
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

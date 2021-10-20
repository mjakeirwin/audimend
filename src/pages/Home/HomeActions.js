import qs from "query-string";

export const BOOKDATA = "BOOKDATA";
export const AUDIOBOOKDATA = "AUDIOBOOKDATA";
export const SAVESEARCHRESULT = "SAVESEARCHRESULT";
export const TOGGLESEARCH = "TOGGLESEARCH";
export const SEARCHBOOKS = "SEARCHBOOKS";
export const ERRORSEARCHBOOKS = "ERRORSEARCHBOOKS";
export const CREATEBOOKGRID = "CREATEBOOKGRID";

const IS_PROD = process.env.IS_PROD || false;

let ENDPOINT = "";

if (IS_PROD) {
  ENDPOINT = "https://api.audimend.dev";
}

export const searchBooks = (searchText) => {
  let url = `${ENDPOINT}/search/${searchText}`;


  const callBackendAPI = async () => {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    if (body.length === 0) {
      console.log("throw error");
      throw Error("Empty query");
    }
    return body;
  };

  return (dispatch) => {
    callBackendAPI(searchText)
      .then((res) => {console.log("bookResponse", res)
        dispatch({
          type: SEARCHBOOKS,
          data: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRORSEARCHBOOKS,
          data: err,
        });
      });
  };
};

export const getBooks = () => {
  const callBackendAPI = async () => {
    const response = await fetch(ENDPOINT + "/similarity", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  return (dispatch) => {
    callBackendAPI().then((res) => {
      dispatch({
        type: BOOKDATA,
        data: res,
      });
    });
  };
};

export const getAudiobooks = (index) => {
  let url = `${ENDPOINT}/audiobooks/${index}`;

  console.log(index, url )

  const callBackendAPI = async () => {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  return (dispatch) => {
    callBackendAPI(index).then((res) => {
      dispatch({
        type: AUDIOBOOKDATA,
        data: res,
      });
    });
  };
};

export const saveSearchResult = (uuid, index) => {
  return {
    type: SAVESEARCHRESULT,
    data: { uuid, index },
  };
};
export const createBookGrid = (audiobooks, searchOptions, index) => {
  return {
    type: CREATEBOOKGRID,
    data: { audiobooks, searchOptions, index },
  };
};

export const toggleSearch = () => {
  return {
    type: TOGGLESEARCH,
  };
};

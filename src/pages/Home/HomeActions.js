export const BOOKDATA = "BOOKDATA";
export const AUDIOBOOKDATA = "AUDIOBOOKDATA";
export const SAVESEARCHRESULT = "SAVESEARCHRESULT";
export const TOGGLESEARCH = "TOGGLESEARCH";

export const getBooks = () => {
  const callBackendAPI = async () => {
    const response = await fetch(
      "/similarity",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

export const getAudiobooks = () => {
  const callBackendAPI = async () => {
    const response = await fetch(
      "/audiobooks"
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  return (dispatch) => {
    callBackendAPI().then((res) => {
      dispatch({
        type: AUDIOBOOKDATA,
        data: res,
      });
    });
  };
};

export const saveSearchResult = (uuid, index) => {
  console.log("action", "saveSearchResult", uuid, index);
  return {
    type: SAVESEARCHRESULT,
    data: { uuid, index },
  };
};

export const toggleSearch = () => {
  return {
    type: TOGGLESEARCH,
  };
};

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import style from "./searchinput.css";
import SearchIcon from "@material-ui/icons/Search.js";
const filterOptions = createFilterOptions({
  limit: 500,
});

const getTitle = (option) => {
  return option.title;
};

export default function SearchInput(props) {
  let { bookNames, onChange, currentSearch } = props;

  const keyPress = (e, onChange) => {

    if (e.uuid && e.index) {
      onChange(e);
    }
  
    if (e.keyCode === 13) {
      onChange(e, "enter");
    }
  };


  return (
    <div className="background">
      <Autocomplete
        freeSolo
        id="free-solo-2-demo2"
        disableClearable
        onChange={(e, value) => {
              keyPress(value, onChange);
            }}
            onKeyDown={(e) => {
              keyPress(e, onChange);
            }}
        filterOptions={filterOptions}
        options={bookNames}
        getOptionLabel={getTitle}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ ml: 1, flex: 1, color: "white" }}
            label="Search"
            placeholder = {currentSearch}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <SearchIcon className="searchIcon" />
    </div>
  );
}

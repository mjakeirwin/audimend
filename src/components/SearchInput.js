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
  let { bookNames, onChange } = props;


  return (
    <div className="background">
      <Autocomplete
        freeSolo
        id="free-solo-2-demo2"
        disableClearable
        onChange={(event, value) => {
          onChange(value);
        }}
        filterOptions={filterOptions}
        options={bookNames}
        getOptionLabel={getTitle}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ ml: 1, flex: 1, color: "white" }}
            label="Search"
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

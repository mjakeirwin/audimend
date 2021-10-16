import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Grow from "@mui/material/Grow";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filterOptions = createFilterOptions({
  limit: 500,
});

const getTitle = (option) => {
  return option.title
};

export default function MainSearch(props) {
  let { bookNames, onChange } = props;

  return (
    <Grow in={true} timeout={4000}>
      <div style={{ display: "flex" }}>
        <Paper
          component="form"
          elevation={10}
          variant="elevation"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "25%",
            color: "white",
            background: "black",
            height: "3.5rem",
          }}
        >
          <Divider
            sx={{ height: 28, m: 0.5, background: "white", marginLeft: '10%' }}
            orientation="vertical"
          />
          <Autocomplete
            freeSolo
            sx={{ width: "100%"}}
            ListboxProps={{ style: { maxHeight: '15rem' } }}
            id="free-solo-2-demo2"
            onChange={(event,value) => {onChange(value)}}
            disableClearable
            limitTags = {5}
            getOptionLabel = {getTitle}
            filterOptions={filterOptions}
            options={bookNames}
            renderInput={(params) => {
              const { InputLabelProps, InputProps, ...rest } = params;
              return (
                <InputBase
                  {...params.InputProps}
                  {...rest}
                  sx={{ ml: 1, flex: 1, color: "white" }}
                  placeholder="Search"
                />
              );
            }}
          />
        </Paper>
      </div>
    </Grow>
  );
}

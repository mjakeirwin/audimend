import React, { useState, Component } from "react";
import style from "./clusterconsole.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


var CLUSTERCATEGORIES = [
  { Name: "Category", Status: true },
  { Name: "Concepts", Status: true },
  { Name: "Entities", Status: true },
  { Name: "Keywords", Status: true },
  { Name: "Length", Status: true },
  { Name: "Author", Status: true },
  { Name: "Narrator", Status: true },
  { Name: "Rating", Status: true },
];

const TITLE = "Clustering Console";
const DESCRIPTION =
  "Select a combination of inputs to cluster the audiobook dataset by those inputs.";

const ClusterConsole = (props) => {
  const [grid, setGrid] = useState(CLUSTERCATEGORIES);

  const handleClick = (key) => {
    let newArr = [...grid];
    newArr[key] = { Name: newArr[key].Name, Status: !newArr[key].Status };
    setGrid(newArr);
  };


  return (
    <div className="console">
      <Typography
        variant="h5"
        component="div"
        noWrap
        sx={{
          color: "white",
          margin: "2%",
          marginBottom: "0%",
        }}
      >
        {TITLE}
      </Typography>

      <Divider
        sx={{ height: 1, m: 0.5, background: "white" }}
        orientation="horizontal"
      />

      <div className="controlConsole">
        <Typography
          sx={{
            marginLeft: "2%",
            color: "white",
            fontSize: "1.1rem",
            width: "30%",
          }}
        >
          {DESCRIPTION}
        </Typography>
        <Button
      
          className = 'submitButton'
          key="clusterSubmit"
          color = 'primary'
          variant="outlined"
        >
          Cluster
        </Button>
        <Divider
          sx={{
            height: "120px",
            m: "10",
            background: "white",
            borderWidth: "1px",
            margin: "0",
            "margin-left": "auto",
            marginRight: "1%",
          }}
          orientation="vertical"
        />
        <div className="added">
          {grid.map((category, key) => (
            <Button
              sx={{ margin: '10px 5px 0 5px', height: '40px', 'width': '21%', fontSize: '0.75rem'}}
              key={key}
              variant="contained"
              className={category.Status ? "" : "disabledButton"}
              onClick={() => handleClick(key)}
            >
              {category.Name}
            </Button>
          ))}
        </div>
        <Divider
          sx={{
            height: "120px",
            m: "10",
            background: "white",
            borderWidth: "1px",
            margin: "0",
            marginLeft: "1%",
            marginRight: "1%",
          }}
          orientation="vertical"
        />
      </div>
    </div>
  );
};

export default ClusterConsole;

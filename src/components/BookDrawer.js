import React from "react";
import style from "./bookcard.css";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import missingImage from ".././images/missingImage.png";
import Button from "@mui/material/Button";

const BookDrawer = (props) => {
  let { book } = props;
  return (
    <Box sx={{ width: '400px' }} role="presentation" marginTop="20%">
      <Paper
        variant="outlined"
        sx={{
          width: "150px",
          height: "150px",
          color: "white",
          background: "white",
          boxShadow: "2px 2px grey",
          margin: "auto",
        }}
      >
        {book && book.image_google ? (
          <img
            src={book.image_google}
            alt={book.title}
            width="100%"
            height="100%"
          />
        ) : (
          <img src={missingImage} alt={book.title} width="100%" height="100%" />
        )}
      </Paper>

      <Typography
        variant="h5"
        component="div"
        noWrap
        sx={{
          fontSize: "20px",
          textAlign: "center",
          marginTop: "10%",
        }}
      >
        {book.title}
      </Typography>
      <Divider
        sx={{
          height: "1px",
          background: "black",
          width: "50%",
          margin: "5% auto",
        }}
        orientation="vertical"
      />
      <Typography
        sx={{ fontSize: 14, textAlign: "center", marginTop: "10%" }}
        color="text.secondary"
        gutterBottom
      >
        {book.author}
      </Typography>
      <Typography
        sx={{ fontSize: 14, textAlign: "center", marginBottom: '10%' }}
        color="text.secondary"
        gutterBottom
      >
        {book && book.categories_google && eval(book.categories_google)[0]}
      </Typography>
      <Button
        variant="contained"
        sx={{
          fontSize: 14,
          textAlign: "center",
          margin: "0 auto",
          display: "block",
        }}
        color="success"
        onClick={() => {
          window.open(book.link);
        }}
      >
        Audible
      </Button>
     <Divider
        sx={{
          height: "1px",
          background: "black",
          width: "50%",
          margin: "auto",
          marginTop: '10%'
        }}
        orientation="vertical"
      />
      <Typography sx={{ fontSize: 14, textAlign: "center", margin: "5% 10%" }}>
        {book.description_google}
      </Typography>
      <Divider
        sx={{
          height: "1px",
          background: "black",
          width: "50%",
          margin: "auto",
          marginTop: '5%'
        }}
        orientation="vertical"
      />
    </Box>
  );
};

export default BookDrawer;

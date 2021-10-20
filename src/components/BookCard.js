import React from "react";
import style from "./bookcard.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import missingImage from ".././images/missingImage.png";

const BookCard = (props) => {
  let { openBook, book } = props;

  return (
    <Grow in={true} timeout={2000}>
      <Card
        sx={{ minWidth: 50, minHeight: 200, maxHeight: 200, border: "1px solid black" }}
        raised={true}
      >
        <Paper
          variant="outlined"
          sx={{
            width: "150px",
            height: "150px",
            color: "white",
            background: "white",
            marginLeft: "10%",
            boxShadow: "2px 2px grey",
            position: "relative",
            top: "20px",
            right: "20px",
            float: "right",
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
            <img
              src={missingImage}
              alt={book && book.title}
              width="100%"
              height="100%"
            />
          )}
        </Paper>

        <CardContent sx={{}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {book && book.author}
          </Typography>
          <Typography variant="h5" component="div" noWrap>
            {book && book.title}

            <Divider
              sx={{ height: "1px", background: "black", width: "10%" }}
              orientation="vertical"
            />
          </Typography>

          <Typography sx={{ mb: 1.5, maxHeight: "25%" }} color="text.secondary">
            {book && book.rating_google ? book.rating_google : "-"}
          </Typography>

          <Box sx={{ width: "70%", height: "30px", paddingBottom: "1rem" }}>
            <Typography className="description">{book && book.text_snippet}</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ paddingTop: "0px", float: "bottom" }}>
          <Button size="small" onClick={() => openBook(true, book)}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default BookCard;

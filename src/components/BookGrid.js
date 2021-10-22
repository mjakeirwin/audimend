import React from "react";
import style from "./header.css";
import Grid from "@mui/material/Grid";
import BookCard from "./BookCard";

const BookGrid = (props) => {
  let { bookGrid, openBook, handleClick, updateBook } = props;

  return (
    <Grid container spacing={2} sx={{}}>
      {bookGrid.map((book, key) => (
        <Grid key={key} item xs={8} md={4} lg={4}>
          <BookCard
            book={book}
            openBook={openBook}
            handleClick={handleClick}
            updateBook = {updateBook}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;

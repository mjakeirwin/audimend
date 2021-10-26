import React from "react";
import style from "./header.css";
import Grid from "@mui/material/Grid";
import BookCard from "./BookCard";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const BookGrid = (props) => {
  let {
    bookGrid,
    openBook,
    handleClick,
    updateBook,
    currentBook,
    bookRefresh,
  } = props;

  return (
    <React.Fragment>
      {bookRefresh ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            sx={{
              width: "50%",
              height: "5px",
              marginLeft: "25%",
              marginTop: "20%",
            }}
          />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{}}>
          {bookGrid.map((book, key) => (
            <Grid key={key} item xs={8} md={4} lg={4}>
              <BookCard
                book={book.book}
                openBook={openBook}
                handleClick={handleClick}
                updateBook={updateBook}
                currentBook={currentBook}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default BookGrid;

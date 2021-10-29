import React, { useState, Component } from "react";
import style from "./bookcard.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import missingImage from ".././images/missingImage.png";
import { makeStyles } from "@material-ui/styles";
import { render } from "react-dom";
import Slide from "@mui/material/Slide";


class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "normal",
      fade: true,
    };
  }

  componentDidMount(props) {
    let { book } = this.props;

    this.setState({ prevBook: { uuid: book.uuid } });
  }

  componentDidUpdate(prevProps) {
    let { book } = this.props;

    if (prevProps.book.uuid !== book.uuid) {
      this.setState({ color: "changed" });
    }
  }

  fadeAnimation = (book) => {
    let { handleClick, currentBook } = this.props;

    if (!currentBook) {
      this.setState({ fade: !this.state.fade });
      handleClick(book, this.bringBack);
    } else if (currentBook) {
      handleClick(true, book);
    }
  };

  bringBack = () => {
    this.setState({ fade: !this.state.fade });
  };

  render() {
    let { openBook, book } = this.props;
    let { fade } = this.state;


    return (
      <div>
        <Grow key={book.uuid} in={fade} timeout={1000}>
          <Card
            sx={{
              minWidth: "50",
              minHeight: "200px",
              maxHeight: "200px",
              border: "1px solid black",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            raised={fade}
            onClick={() => this.fadeAnimation(book)}
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
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {book && book.author}
              </Typography>
              <Typography variant="h5" component="div" noWrap>
                {book && book.title}

                <Divider
                  sx={{ height: "1px", background: "black", width: "10%" }}
                  orientation="vertical"
                />
              </Typography>

              <Typography
                sx={{ mb: 1.5, maxHeight: "25%" }}
                color="text.secondary"
              >
                {book && book.categories_google
                  ? eval(book.categories_google)[0] + "    "
                  : "    "}

                {book && book.rating_google ? book.rating_google : ""}
              </Typography>

              <Box sx={{ width: "70%", height: "30px", paddingBottom: "1rem" }}>
                <Typography className="description">
                  {book && book.text_snippet}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ paddingTop: "0px", float: "bottom" }}>
              <Button size="small" onClick={() => openBook(true, book)}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grow>
      </div>
    );
  }
}

export default BookCard;

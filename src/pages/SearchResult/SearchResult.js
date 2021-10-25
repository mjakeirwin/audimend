import React, { Component } from "react";
import { connect } from "react-redux";
import BookGrid from "../../components/BookGrid";
import Divider from "@mui/material/Divider";
import BookCard from "../../components/BookCard";
import BookDrawer from "../../components/BookDrawer";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import {
  getAudiobooks,
  createBookGrid,
  changeBook,
} from "../Home/HomeActions";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openBook: false,
      clickedBook: null,
      updateAudiobooks: true,
      updateBook: null,
      fade: null,
      indexHigh: null,
      indexLow: null,
    };
  }

  componentDidMount(props) {}

  componentDidUpdate(prevProps) {
    let {
      index,
      getAudiobooks,
      createGrid,
      createBookGrid,
      audiobooks,
      searchOptions,
      updateAudiobooks,
      indexBounds
  
    } = this.props;

    console.log(indexBounds.indexHigh, index, indexBounds.indexLow);

    if (updateAudiobooks) {
      getAudiobooks(index);
    }

    if (Number(index) + 12 >= indexBounds.indexHigh) {
      getAudiobooks(index);

    }

    if (createGrid && audiobooks && searchOptions) {
      setTimeout(() => createBookGrid(audiobooks, searchOptions, index), 2000);
    }
  }

  openBook = (boolean, book = {}) => {
    this.setState({ openBook: boolean, clickedBook: book });
  };

  handleClick = (book, bringBack) => {
    let { changeBook, audiobooks, searchOptions } = this.props;

    this.setState({ fade: true, updateBook: book });

    setTimeout(() => changeBook(audiobooks, searchOptions, book), 800);
    setTimeout(() => bringBack(), 1000);
  };

  render() {
    let { audiobooks, searchResult, bookGrid, loadingSearch } = this.props;
    let { openBook, clickedBook, updateBook, fade } = this.state;

    return (
      <React.Fragment>
        {loadingSearch ? (
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
          <div>
            <Drawer
              anchor={"right"}
              open={openBook}
              onClose={() => {
                this.openBook(false);
              }}
            >
              <BookDrawer book={clickedBook} />
            </Drawer>
            <div>
              <Container
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  padding: "16px !important",
                  maxWidth: "100% !important",
                  margin: "0",
                  display: "inline-block",
                }}
              >
                {audiobooks && (
                  <BookCard
                    book={audiobooks[searchResult]}
                    openBook={this.openBook}
                    handleClick={this.openBook}
                    updateBook={updateBook}
                    currentBook={true}
                  />
                )}
              </Container>
              {/* 
              <Container
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  padding: "16px !important",
                  maxWidth: "50% !important",
                  display: "inline-block",

                  float: "right",
                }}
              >
                <Card
                  sx={{
                    minWidth: 50,
                    minHeight: 200,
                    maxHeight: 200,
                    border: "1px solid black",
                  }}
                  raised={false}
                />
              </Container> */}
            </div>

            <Divider
              sx={{ height: 1, m: 0.5, background: "black" }}
              orientation="horizontal"
            />
            <Container
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                padding: "16px !important",
                maxWidth: "100% !important",
                position: "absolute",
                height: "100%",
              }}
            >
              {audiobooks && bookGrid && (
                <BookGrid
                  bookGrid={bookGrid}
                  openBook={this.openBook}
                  handleClick={this.handleClick}
                  updateBook={updateBook}
                />
              )}
            </Container>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    searchResult: state["home"]["searchResult"],
    audiobooks: state["home"]["audiobookData"],
    index: state["home"]["index"],
    searchOptions: state["home"]["searchOptions"],
    bookGrid: state["home"]["bookGrid"],
    createGrid: state["home"]["createGrid"],
    loadingSearch: state["home"]["loadingSearch"],
    updateAudiobooks: state["home"]["updateAudiobooks"],
    indexBounds: state["home"]["indexBounds"],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAudiobooks: (index) => dispatch(getAudiobooks(index)),

    createBookGrid: (audiobooks, searchOptions, index) =>
      dispatch(createBookGrid(audiobooks, searchOptions, index)),
    changeBook: (audiobooks, searchOptions, book) =>
      dispatch(changeBook(audiobooks, searchOptions, book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

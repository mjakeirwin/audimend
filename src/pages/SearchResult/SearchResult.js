import React, { Component } from "react";
import { connect } from "react-redux";
import BookGrid from "../../components/BookGrid";
import Divider from "@mui/material/Divider";
import BookCard from "../../components/BookCard";
import BookDrawer from "../../components/BookDrawer";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import { getAudiobooks, createBookGrid, changeBook, initRefresh } from "../Home/HomeActions";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import style from "./searchresult.css";
import Typography from "@mui/material/Typography";

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
      indexBounds,
      initRefresh
    } = this.props;

    console.log(indexBounds.indexHigh, index, indexBounds.indexLow);

    if (updateAudiobooks) {
      getAudiobooks(index);
    }

    if (Number(index) + 12 >= indexBounds.indexHigh) {
      initRefresh(true)
      getAudiobooks(index);
    }

    if (createGrid && audiobooks && searchOptions) {
      createBookGrid(audiobooks, searchOptions, index);
      initRefresh(false)

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
    let { audiobooks, searchResult, bookGrid, loadingSearch, bookRefresh } = this.props;
    let { openBook, clickedBook, updateBook } = this.state;

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
                  maxWidth: "50% !important",
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

              <Container
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  padding: "16px !important",
                  paddingBottom: "18px !important",
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
                    backgroundColor: "#84ffff",
                    borderRadius: "0px",
                  }}
                  raised={true}
                >
                  <div className="console">
                    <Typography
                      variant="h5"
                      component="div"
                      noWrap
                      sx={{
                        color: "white",
                        margin: '2%'
                      }}
                    >
                      Audiobook Recommendations
                    </Typography>
                  </div>
                </Card>
              </Container>
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
                boxShadow: "2px 2px grey",
              }}
            >
              {audiobooks && bookGrid && (
                <BookGrid
                  bookGrid={bookGrid}
                  openBook={this.openBook}
                  handleClick={this.handleClick}
                  updateBook={updateBook}
                  bookRefresh = {bookRefresh}
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
    bookRefresh: state["home"]["bookRefresh"]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAudiobooks: (index) => dispatch(getAudiobooks(index)),

    createBookGrid: (audiobooks, searchOptions, index) =>
      dispatch(createBookGrid(audiobooks, searchOptions, index)),
    changeBook: (audiobooks, searchOptions, book) =>
      dispatch(changeBook(audiobooks, searchOptions, book)),
      initRefresh: (boolean) =>
      dispatch(initRefresh(boolean))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

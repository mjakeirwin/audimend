import React, { Component } from "react";
import { connect } from "react-redux";
import BookGrid from "../../components/BookGrid";
import Divider from "@mui/material/Divider";
import BookCard from "../../components/BookCard";
import BookDrawer from "../../components/BookDrawer";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import { getAudiobooks, createBookGrid } from "../Home/HomeActions";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openBook: false,
      clickedBook: null,
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
    } = this.props;

    if (prevProps.index !== index) {
      getAudiobooks(index);
    }

    if (createGrid && audiobooks && searchOptions) {
      createBookGrid(audiobooks, searchOptions, index);
    }
  }

  openBook = (boolean, book = {}) => {
    this.setState({ openBook: boolean, clickedBook: book });
  };

  render() {
    let { audiobooks, searchResult, bookGrid } = this.props;
    let { openBook, clickedBook } = this.state;

    return (
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={openBook}
          onClose={() => {
            this.openBook(false);
          }}
        >
          <BookDrawer book={clickedBook} />
        </Drawer>
        <Container
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            padding: "16px !important",
            maxWidth: "100% !important",
          }}
        >
          {audiobooks && (
            <BookCard
              book={audiobooks[searchResult]}
              openBook={this.openBook}
            />
          )}
        </Container>

        <Divider
          sx={{ height: 1, m: 0.5, background: "black" }}
          orientation="horizontal"
        />
        <Container
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            padding: "16px !important",
            maxWidth: "100% !important",
          }}
        >
          {audiobooks && bookGrid && (
            <BookGrid bookGrid={bookGrid} openBook={this.openBook} />
          )}
        </Container>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAudiobooks: (index) => dispatch(getAudiobooks(index)),
    createBookGrid: (audiobooks, searchOptions, index) =>
      dispatch(createBookGrid(audiobooks, searchOptions, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

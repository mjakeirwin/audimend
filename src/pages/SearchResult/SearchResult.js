import React, { Component } from "react";
import { connect } from "react-redux";
import BookGrid from "../../components/BookGrid";
import Divider from "@mui/material/Divider";
import style from "./searchresult.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BookCard from "../../components/BookCard";
import BookDrawer from "../../components/BookDrawer";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import { height } from "@mui/system";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openBook: false,
      clickedBook: null,
      bookGrid: [],
    };
  }

  componentDidMount(props) {
    let { index, searchOptions, audioBooks } = this.props;
    let bookGrid = [];
    let indexArray = [];
    let low = Number(index) - 4;
    let high = Number(index) + 5;
    index = Number(index)
    let abslow = Math.abs(low);

    if (low < 0) {
      low = 0;
      high = high + abslow;
    }

    for (var i = low; i <= high; i++) {
      console.log(i, index)
      if (i !== Number(index)) {
        indexArray.push(i);
      }
    }

    indexArray.forEach((element) =>
      bookGrid.push(audioBooks[searchOptions[element].uuid])
    );

    console.log(indexArray, bookGrid);

    this.openBook(false);

    this.setState({ bookGrid: bookGrid });
  }

  componentDidUpdate(props) {
    let { index, searchOptions } = this.props;
    let bookGrid = [];
    let low = Number(index) - 4;
    let high = Number(index) + 5;
    let abslow = Math.abs(low);

    if (low < 0) {
      low = 0;
      high = high + abslow;
    }

    for (var i = low; i <= high; i++) {
      bookGrid.push(i);
    }

    console.log(bookGrid);
  }

  openBook = (boolean, book = {}) => {
    this.setState({ openBook: boolean, clickedBook: book });
  };

  render() {
    let { audioBooks, searchResult } = this.props;
    let { openBook, clickedBook, bookGrid } = this.state;

    console.log("BOOKGRID", bookGrid);

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
          <BookCard book={searchResult} openBook={this.openBook} />
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
          {audioBooks && (
            <BookGrid bookGrid={bookGrid} openBook={this.openBook} />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);

  return {
    searchResult: state["home"]["searchResult"],
    audioBooks: state["home"]["audiobookData"],
    index: state["home"]["index"],
    searchOptions: state["home"]["searchOptions"],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

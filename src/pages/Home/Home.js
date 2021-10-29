import React, { Component } from "react";
import { connect } from "react-redux";
import Slide from "@mui/material/Slide";
import BookGrid from "../../components/BookGrid";
import style from "./home.css";
import MainSearch from "../../components/MainSearch";
import audimend from "../.././images/audimend.png";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  getBooks,
  getAudiobooks,
  saveSearchResult,
  toggleSearch,
  searchBooks,
} from "./HomeActions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let { getBooks, toggleSearch } = this.props;

    getBooks();
    toggleSearch();
  }

  handleSearch = (e, type) => {
    let { history, saveSearchResult, searchBooks, getAudiobooks } = this.props;

    var path = "/search/:bookId/".replace(":bookId", type);

    if (e.uuid && e.index) {
      searchBooks(e.title);

      path = "/search/:bookId/".replace(":bookId", e.title);
    }

    if (type === "enter") {
      searchBooks(e.target.value);

      path = "/search/:bookId/".replace(":bookId", e.target.value);
    }

    history.push(path);
  };

  render() {
    let { searchOptions, loading } = this.props;

    return (
      <React.Fragment>
        {loading ? (
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
          <div >
            <Slide
              direction="up"
              in={true}
              timeout={2000}
              mountOnEnter
              unmountOnExit
            >
              <img src={audimend} alt="audimend logo" className="logo" />
            </Slide>

            <div className="search">
              <MainSearch
                bookNames={searchOptions}
                onChange={this.handleSearch}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    count: state["home"]["count"],
    searchOptions: state["home"]["searchOptions"],
    audioBooks: state["home"]["audiobookData"],
    loading: state["home"]["loading"],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => dispatch(getBooks()),
    getAudiobooks: (index) => dispatch(getAudiobooks(index)),
    saveSearchResult: (uuid, index) => dispatch(saveSearchResult(uuid, index)),
    toggleSearch: () => dispatch(toggleSearch()),
    searchBooks: (searchText) => dispatch(searchBooks(searchText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

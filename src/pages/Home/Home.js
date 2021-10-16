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
} from "./HomeActions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let { getBooks, getAudiobooks, toggleSearch } = this.props;

    getBooks();
    getAudiobooks();
    toggleSearch();
  }

  handleSearch = (e) => {
    let { history, saveSearchResult } = this.props;

    console.log(e)

    saveSearchResult(e.uuid, e.index);

    let path = "/search/:bookId/".replace(":bookId", e.uuid);
    console.log("HANDLESEARCH", path);
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
          <div>
            <div className="search">
              <Slide
                direction="up"
                in={true}
                timeout={2000}
                mountOnEnter
                unmountOnExit
              >
                <img src={audimend} alt="audimend logo" className="logo" />
              </Slide>

              <MainSearch
                bookNames={searchOptions}
                onChange={this.handleSearch}
              />
            </div>
            <div></div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);

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
    getAudiobooks: () => dispatch(getAudiobooks()),
    saveSearchResult: (uuid, index) => dispatch(saveSearchResult(uuid, index)),
    toggleSearch: () => dispatch(toggleSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

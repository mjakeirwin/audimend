import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu.js";
import SearchIcon from "@material-ui/icons/Search.js";
import Fade from "@mui/material/Fade";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import { searchBooks } from "../pages/Home/HomeActions";


import style from "./header.css";
import SearchInput from "./SearchInput";
import CustomLink from "./CustomLink";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = this.handleSearch.bind(this);

  }

  componentDidMount(props) {}

  handleSearch = (e, type) => {
    let { history, searchBooks } = this.props;

    var path = "/search/:bookId/".replace(":bookId", type);


    if (e.uuid && e.index) {
      searchBooks(e.title);

      path = "/search/:bookId/".replace(":bookId", e.title);
    } 

    if (type === 'enter'){
      searchBooks(e.target.value);

      path = "/search/:bookId/".replace(":bookId", e.target.value);

    }

    history.push(path);
  };

  render() {
    let { bookNames, openSearch, searchTitle } = this.props;

    console.log(searchTitle)

    return (
      <div>
        <AppBar position="static" className="header">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <CustomLink to="/home">
              {({ onClick }) => (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                  onClick={onClick}
                >
                  Audimend
                </Typography>
              )}
            </CustomLink>

            <Fade in={true} timeout={2000}>
              <div className="searchContainer">
                {openSearch ? (
                  <SearchInput bookNames={bookNames} onChange={this.handleSearch} currentSearch = {searchTitle}/>
                ) : (
                  <SearchIcon sx={{ float: "right" }} />
                )}
              </div>
            </Fade>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    openSearch: state["home"]["openSearch"],
    bookNames: state["home"]["searchOptions"],
    location: ownProps.location.pathname,
    searchTitle: state["home"]["searchTitle"]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchBooks: (searchText) => dispatch(searchBooks(searchText)),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

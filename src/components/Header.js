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
import { saveSearchResult } from "../pages/Home/HomeActions";


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

  handleSearch = (e) => {
    let { history, saveSearchResult } = this.props;

    console.log("headerSearch", e.index)

    saveSearchResult(e.uuid, e.index);

    let path = "/search/:bookId/".replace(":bookId", e.uuid);
    history.push(path);
  };

  render() {
    let { bookNames, openSearch } = this.props;


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
                  <SearchInput bookNames={bookNames} onChange={this.handleSearch}
 />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearchResult: (uuid, index) => dispatch(saveSearchResult(uuid, index)),

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

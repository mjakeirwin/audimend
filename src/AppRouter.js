import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";
import Header from "./components/Header";

import style from "./styles.css";

class AppRouter extends React.Component {
  state = {
    data: null,
  };

  render() {
    return (
      <BrowserRouter>
        <Header />

        <div className="main">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/search/:bookId/" component={SearchResult} />
            <Route component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;

import "./App.css";
import React, { Component } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color="aqua"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={15}
                  category="business"
                  category2="StockMarket"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={15}
                  category="entertainment"
                  category2="WebSeries"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={15}
                  category="Engineering"
                  category2="Space"
                />
              }
            />
            <Route
              exact
              path="/lifestyle"
              element={
                <News
                  setProgress={this.setProgress}
                  key="lifestyle"
                  pageSize={15}
                  category="lifestyle"
                  category2="Personal Health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={15}
                  category="science"
                  category2="Rockets"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={15}
                  category="cricket"
                  category2="football"
                />
              }
            />
            <Route
              exact
              path="/AI"
              element={
                <News
                  setProgress={this.setProgress}
                  key="AI"
                  pageSize={15}
                  category="AI"
                  category2="MachineLearning"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

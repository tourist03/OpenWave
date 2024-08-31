import "./App.css";
import React, { Component } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            
            <Route
              exact path="/"
              element={<News key = "business" pageSize={15} category="business" category2="StockMarket"/>}
            />
            <Route
              exact path="/entertainment"
              element={<News key = "entertainment" pageSize={15} category="entertainment" category2="WebSeries"/>}
            />
            <Route
              exact path="/technology"
              element={<News key = "technology" pageSize={15} category="Engineering" category2="Space" />}
            />
            <Route
              exact path="/lifestyle"
              element={<News key = "lifestyle" pageSize={15} category="lifestyle" category2="Personal Health"/>}
            />
            <Route
              exact path="/science"
              element={<News key = "science" pageSize={15} category="science" category2="Rockets" />}
            />
            <Route
              exact path="/sports"
              element={<News key = "sports" pageSize={15} category="cricket" category2="football"/>}
            />
            <Route
              exact path="/AI"
              element={<News key = "AI" pageSize={15} category="AI" category2="MachineLearning"/>}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

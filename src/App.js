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
              element={<News key = "business" pageSize={15} category="business" />}
            />
            <Route
              exact path="/entertainment"
              element={<News key = "entertainment" pageSize={15} category="entertainment" />}
            />
            <Route
              exact path="/technology"
              element={<News key = "technology" pageSize={15} category="technology" />}
            />
            <Route
              exact path="/health"
              element={<News key = "health" pageSize={15} category="health" />}
            />
            <Route
              exact path="/science"
              element={<News key = "science" pageSize={15} category="science" />}
            />
            <Route
              exact path="/sports"
              element={<News key = "sports" pageSize={15} category="sports" />}
            />
            <Route
              exact path="/AI"
              element={<News key = "AI" pageSize={15} category="AI" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

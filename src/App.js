import "./App.css";
import React, { useState } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  const apikey = process.env.REACT_APP_NEWS_API;

  const [progress , setProgress] = useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar height={3} color="aqua" progress={progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={setProgress}
                  apikey={apikey}
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
                  setProgress={setProgress}
                  apikey={apikey}
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
                  setProgress={setProgress}
                  apikey={apikey}
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
                  setProgress={setProgress}
                  apikey={apikey}
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
                  setProgress={setProgress}
                  apikey={apikey}
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
                  setProgress={setProgress}
                  apikey={apikey}
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
                  setProgress={setProgress}
                  apikey={apikey}
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

export default App;

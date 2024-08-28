import './App.css';
import React, { Component } from 'react';
import Navbar from './component/Navbar';
import News from './component/News'; // This should match the export from News.js

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News />
      </div>
    );
  }
}


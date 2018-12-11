import React, { Component } from 'react';

import IconBar from './IconBar';
import SearchBar from './SearchBar'
import Weather from './Weather'

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar />
          <IconBar />
          <Weather />
        </header>
      </div>
    );
  }
}

export default App;

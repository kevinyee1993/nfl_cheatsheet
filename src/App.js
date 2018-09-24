import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerSearchBar from './components/player_search_bar';
import SearchResults from './components/search_results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerSearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default App;

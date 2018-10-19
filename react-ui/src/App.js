import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerSearchBar from './components/player_search_bar';
import SearchResults from './components/search_results';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className='search-bar-and-results'>
          <PlayerSearchBar />
          <SearchResults />
        </div>
      </div>
    );
  }
}

export default App;

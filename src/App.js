import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerSearchBar from './components/player_search_bar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerSearchBar />
      </div>
    );
  }
}

export default App;

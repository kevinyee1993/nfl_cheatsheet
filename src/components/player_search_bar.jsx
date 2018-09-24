import React, { Component } from 'react';
import PlayerSearchBarForm from './player_search_bar_form';

export default class PlayerSearchBar extends Component {
  submit(values) {
    console.log(values);
  }

  render() {
    return(
      <PlayerSearchBarForm onSubmit={ this.submit }/>
    );
  }

}

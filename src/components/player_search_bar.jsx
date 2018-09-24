import React, { Component } from 'react';
import PlayerSearchBarForm from './player_search_bar_form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { valueSubmitted } from '../actions/index';

class PlayerSearchBar extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    // console.log(values);
    this.props.valueSubmitted(values);
  }

  render() {
    return(
      <PlayerSearchBarForm onSubmit={ this.submit }/>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ valueSubmitted: valueSubmitted }, dispatch);
}

export default connect(null, mapDispatchToProps)(PlayerSearchBar);

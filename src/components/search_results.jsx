import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
// might not be able to do standard axios request here,
// looks like need to do a CORS request or something

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    axios.get(`/stats/${ this.props.searchName }`)
      .then( response => console.log(response) )
      .catch( error => console.log(error));
  }

  render() {
    return(<div>{ this.props.searchName }</div>);
  }
}

function mapStateToProps(state) {
  return { searchName: state.searchName.values.name };
}

export default connect(mapStateToProps)(SearchResults);

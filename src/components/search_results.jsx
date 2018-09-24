import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>{ this.props.searchName }</div>);
  }
}

function mapStateToProps(state) {
  return { searchName: state.searchName.values.name };
}

export default connect(mapStateToProps)(SearchResults);

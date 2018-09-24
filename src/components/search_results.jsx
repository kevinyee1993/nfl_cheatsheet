import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
// might not be able to do standard axios request here,
// looks like need to do a CORS request or something

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      rank: null,
      position: null,
      description: null,
      link: null
    };
  }

  // async componentDidUpdate(prevState) {
  async componentDidUpdate(prevState) {
    // console.log(prevState.name === this.state.name);
    if(!this.state.name || (prevState.searchName &&
      this.state.name &&
      prevState.searchName.toLowerCase() !== this.props.searchName.toLowerCase() )) {
      await axios.get(`/stats/${ this.props.searchName.toLowerCase() }`)
      .then( response => this.setState(response.data) )
      .catch( error => console.log(error));
    } else {
      return;
    }
  }

  render() {
    console.log(this.state);
    return(
      <div>
      <p>{ this.state.name }</p>
      <p>{ this.state.rank }</p>
      <p>{ this.state.position }</p>
      <p>{ this.state.description }</p>
      <p>{ this.state.link }</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchName: state.searchName.values.name };
}

export default connect(mapStateToProps)(SearchResults);

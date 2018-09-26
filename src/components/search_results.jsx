import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

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
      .then( response => {
        this.setState(response.data);
      })
      .catch( error => console.log(error));
    } else {
      return;
    }
  }

  render() {
    if(this.props.searchName && !this.state.name) {
      return(
        <div>
          This player was not found or is trash
        </div>
      );
    } else {
      return(
        <div>
        <p>Name: { this.state.name }</p>
        <p>Rank: { this.state.rank }</p>
        <p>Position: { this.state.position }</p>
        <p>Description: { this.state.description }</p>
        <p>Link: <a href={ this.state.link }>{ this.state.link }</a></p>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { searchName: state.searchName.values.name };
}

export default connect(mapStateToProps)(SearchResults);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

// update this with all positions
const POSITIONS = { 'QB': 'quarterback' };

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      rank: null,
      position: null,
      description: null,
      link: null,
      image: null
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

      let playerAdj;
      let statsAdj;

      switch(true) {
        case(this.state.rank < 10):
          playerAdj = 'crazy';
          statsAdj = 'hella';
          break;
        case(this.state.rank < 20):
          console.log("get!");
          playerAdj = 'solid';
          statsAdj = 'a good amount of';
          break;
        case(this.state.rank < 30):
          playerAdj = 'decent';
          statsAdj = 'an ok amount of';
          break;
        case(this.state.rank < 40):
          playerAdj = 'booboo';
          statsAdj = 'barely any';
          break;
        case(this.state.rank < 40):
          playerAdj = 'trash';
          statsAdj = 'no';
          break;
      }

      let analysis = `${ this.state.name } is a ${ playerAdj } ${ this.state.position }.
      He will get you ${ statsAdj } ${ this.state.description }.`

      return(
        <div>
        <img src={ this.state.image }/>
        <p>Name: { this.state.name }</p>
        <p>{ analysis }</p>
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

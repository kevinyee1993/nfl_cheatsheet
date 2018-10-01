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
      image: null,
      team: null
    };

    this.showStats = this.showStats.bind(this);
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

  showStats() {
    return(
    <div className='player-information'>
      <div className='player-image'>
        <img src={ this.state.image }/>
      </div>

      <div className='player-information-text'>
        <p>Name: { capitalizeName(this.state.name) }</p>
        <p>Position: { this.state.position }</p>
        <p>Find out more about <a href={ this.state.link }>{ capitalizeName(this.state.name) }</a></p>
      </div>
    </div>
    );
  }

  render() {
    if(this.props.searchName && !this.state.name) {
      return(
        <div>
          This player was not found or is trash
        </div>
      );
    } else {
      console.log(this.state.team);
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
        // case(this.state.rank < 40):
        default:
          playerAdj = 'trash';
          statsAdj = 'no';
          break;
      }

      let analysis = `${ capitalizeName(this.state.name) } is a ${ playerAdj } ${ this.state.position }.
      He will get you ${ statsAdj } ${ this.state.description }.`

      if(this.state.name) {
        return (
          <div className='player-desc-and-info'>
            <p className='player-analysis'>{ analysis }</p>
            { this.showStats() }
          </div>
        );
      } else {
        return(
          <div>
          </div>
        );
      }
    }
  }
}

function capitalizeName(name) {
  if(!name) {
    return null;
  }

  let split = name.split(" ");
  let firstName = split[0].slice(0,1).toUpperCase() + split[0].slice(1, split[0].length + 1);
  let lastName = split[1].slice(0,1).toUpperCase() + split[1].slice(1, split[1].length + 1);

  return firstName + " " + lastName;
}

function mapStateToProps(state) {
  return { searchName: state.searchName.values.name };
}

export default connect(mapStateToProps)(SearchResults);

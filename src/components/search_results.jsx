import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.playerSearched) {
      if(this.props.playerSearched.values){
        return(
          <div>
            { this.props.playerSearched.values.name }
          </div>
        );
      } else {
        return <div></div>;
      }
    }

    else {
      return (
        <div>what the heck</div>
      );
    }

  }
}

function mapStateToProps(state) {
  return { playerSearched: state.form.PlayerSearchBar };
}

export default connect(mapStateToProps)(SearchResults);

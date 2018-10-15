import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// let PlayerSearchBarForm = props => {
class PlayerSearchBarForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit  = this.props.handleSubmit;
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <div className='search-bar'>
          <label htmlFor="name" className='form-label'>Enter player name:</label>
          <Field name="name" component="input" type="text" />
          <button type="submit" className='btn-primary'>Go</button>
        </div>

        <div className='suggestions'>

        </div>

      </form>
    );
  }
};

function mapDispatchToProps(state) {
  return {
    allPlayers: state.allPlayers
  };
}

let searchBarFormContainer = connect(mapDispatchToProps)(PlayerSearchBarForm);

export default reduxForm({
  // a unique name for the form
  form: 'PlayerSearchBar'
})(searchBarFormContainer);

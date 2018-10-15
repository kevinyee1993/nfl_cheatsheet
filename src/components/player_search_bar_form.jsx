import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// let PlayerSearchBarForm = props => {
class PlayerSearchBarForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit  = this.props.handleSubmit;
  }

  render() {
    let selector = formValueSelector('PlayerSearchBar');
    const value = selector(this.props.state, 'name');

    return (
      <form onSubmit={ this.handleSubmit }>
        <div className='search-bar'>
          <label htmlFor="name" className='form-label'>Enter player name:</label>
          <Field name="name" component="input" type="text" autoComplete="off" list="datalist"/>
          <button type="submit" className='btn-primary'>Go</button>
        </div>

        { typeAhead(value, this.props.allPlayers) }

      </form>
    );
  }
}

function typeAhead(input, allPlayers) {
  if(!input) {
    return <div></div>;
  } else {
    return(
      <datalist id="datalist">
        {
          allPlayers.map(player => {
            return (<option value={ player.name }></option>);
          })
        }

      </datalist>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPlayers: state.allPlayers,
    state: state
  };
}

let searchBarFormContainer = connect(mapStateToProps)(PlayerSearchBarForm);

export default reduxForm({
  // a unique name for the form
  form: 'PlayerSearchBar'
})(searchBarFormContainer);

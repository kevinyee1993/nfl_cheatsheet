import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PlayerSearchBar extends Component {

  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
        hello!
        <form onSubmit={handleSubmit}>
          <input type='text'></input>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'PlayerSearchBar'
})(PlayerSearchBar);

import React from 'react';
import { Field, reduxForm } from 'redux-form';

let PlayerSearchBarForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Enter player name:  </label>
        <Field name="name" component="input" type="text" />
      </div>

      <button type="submit">Go</button>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: 'PlayerSearchBar'
})(PlayerSearchBarForm);

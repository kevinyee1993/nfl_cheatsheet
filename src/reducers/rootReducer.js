import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ValueSubmittedReducer from './value_submitted_reducer';

export default combineReducers({
  form: formReducer,
  searchName: ValueSubmittedReducer
});

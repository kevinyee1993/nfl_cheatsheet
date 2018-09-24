import { VALUE_SUBMITTED } from '../actions/index';

export default function ValueSubmittedReducer(state={values: { name: null }}, action) {
  switch(action.type) {
    case VALUE_SUBMITTED:
      return action.payload;
  }

  return state;
}

import { LOAD_PLAYERS } from '../actions/index';

export default function AllPlayersReducer(state=[], action) {
  switch(action.type) {
    case LOAD_PLAYERS:
      return action.payload;
    default:
      return state;
  }
}

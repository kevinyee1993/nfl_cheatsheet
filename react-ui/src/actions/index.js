export const VALUE_SUBMITTED = 'VALUE_SUBMITTED';
export const LOAD_PLAYERS = 'LOAD_PLAYERS';

export function valueSubmitted(values) {
  return {
    type: VALUE_SUBMITTED,
    payload: { values }
  };
}

export function loadPlayers(players) {
  return {
    type: LOAD_PLAYERS,
    payload: players
  };
}

export const VALUE_SUBMITTED = 'VALUE_SUBMITTED';

export function valueSubmitted(values) {
  return {
    type: VALUE_SUBMITTED,
    payload: { values }
  };
}

export const actionTypes = {
  UPDATE_BUS: 'app/UPDATE_BUS',
  APPEND_OUTPUT: 'app/APPEND_OUTPUT',
};

export function updateBus(bus) {
  return { type: actionTypes.UPDATE_BUS, bus };
}

export function appendOutput(output) {
  return { type: actionTypes.APPEND_OUTPUT, output };
}

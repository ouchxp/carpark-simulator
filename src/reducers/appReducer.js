import { actionTypes as sagaActionTypes } from '../sagas/appSaga';

const initialState = {
  isRunning: false,
  bus: { location: null },
  output: [],
};

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

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BUS:
      return { ...state, bus: action.bus };
    case actionTypes.APPEND_OUTPUT:
      return { ...state, output: [...state.output, action.output] };
    case sagaActionTypes.START_COMMAND_SEQUENCE:
      return { ...state, isRunning: true, output: [] };
    case sagaActionTypes.FINISH_COMMAND_SEQUENCE:
      return { ...state, isRunning: false };
    default:
      return state;
  }
};

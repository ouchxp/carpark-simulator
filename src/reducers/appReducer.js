import { actionTypes } from './actions';
import { actionTypes as sagaActionTypes } from '../sagas/actions';

const initialState = {
  isRunning: false,
  bus: { location: null },
  output: [],
};

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

import { combineReducers } from 'redux';

const catchReducerErrors = reducer => (state, action) => {
  try {
    return reducer(state, action);
  } catch (e) {
    e.action = action && action.type;
    // eslint-disable-next-line no-console
    console.error(e);
    throw e;
  }
};

export const rootReducer = catchReducerErrors(combineReducers({}));

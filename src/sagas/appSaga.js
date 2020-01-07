import { put, delay, takeLatest } from 'redux-saga/effects';

export const actionTypes = {
  START_COMMAND_SEQUENCE: 'appSaga/START_COMMAND_SEQUENCE',
  FINISH_COMMAND_SEQUENCE: 'appSaga/FINISH_COMMAND_SEQUENCE',
};

export function startCommandSequence(commands) {
  return { type: actionTypes.START_COMMAND_SEQUENCE, commands };
}

export function finishCommandSequence() {
  return { type: actionTypes.FINISH_COMMAND_SEQUENCE };
}

export function* executeCommandSequence({ commands }) {
  yield delay(1000);
  // TODO: to be implemented
  yield put(finishCommandSequence());
}

export default function* executeCommandSequenceSaga() {
  yield takeLatest(actionTypes.START_COMMAND_SEQUENCE, executeCommandSequence);
}

import { all, call } from 'redux-saga/effects';
import executeCommandSequenceSaga from './appSaga';

export function* rootSaga() {
  yield all([call(executeCommandSequenceSaga)]);
}

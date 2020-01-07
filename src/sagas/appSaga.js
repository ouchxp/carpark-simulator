import { put, delay, takeLatest, select } from 'redux-saga/effects';
import parseCommands from '../commands/command';
import { updateBus, appendOutput } from '../reducers/actions';
import { actionTypes, finishCommandSequence } from './actions';
import { EXECUTION_DELAY } from '../const';

export const busSelector = store => store.app.bus;

export function* executeCommand(cmd) {
  const bus = yield select(busSelector);
  const [updatedBus, output] = cmd.execute(bus);
  yield put(updateBus(updatedBus));
  if (output) {
    yield put(appendOutput(output));
  }
  yield delay(EXECUTION_DELAY);
}

export function* executeCommandSequenceSaga({ commands }) {
  yield* parseCommands(commands).map(x => executeCommand(x));
  yield put(finishCommandSequence());
}

export default function*() {
  yield takeLatest(
    actionTypes.START_COMMAND_SEQUENCE,
    executeCommandSequenceSaga
  );
}

import { expectSaga } from 'redux-saga-test-plan';
import { executeCommandSequenceSaga, busSelector } from './appSaga';
import { appendOutput, updateBus } from '../reducers/actions';
import { finishCommandSequence } from './actions';
import { rootReducer } from '../reducers';

jest.mock('../const', () => ({
  DIMENSION: 5,
  EXECUTION_DELAY: 0,
}));

describe('appSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles execute command action correctly ', () => {
    return expectSaga(executeCommandSequenceSaga, {
      commands: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'],
    })
      .withState({ app: { bus: { location: null } } })
      .withReducer(rootReducer)
      .select(busSelector)
      .put(updateBus({ location: { x: 1, y: 2, f: 'EAST' } }))
      .select(busSelector)
      .put(updateBus({ location: { x: 2, y: 2, f: 'EAST' } }))
      .select(busSelector)
      .put(updateBus({ location: { x: 3, y: 2, f: 'EAST' } }))
      .select(busSelector)
      .put(updateBus({ location: { x: 3, y: 2, f: 'NORTH' } }))
      .select(busSelector)
      .put(updateBus({ location: { x: 3, y: 3, f: 'NORTH' } }))
      .select(busSelector)
      .put(updateBus({ location: { x: 3, y: 3, f: 'NORTH' } }))
      .put(appendOutput('3,3,NORTH'))
      .put(finishCommandSequence())
      .run();
  });
});

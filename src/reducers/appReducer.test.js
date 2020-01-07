import appReducer from './appReducer';
import { updateBus, appendOutput } from './actions';
import { startCommandSequence, finishCommandSequence } from '../sagas/actions';

describe('appReducer', () => {
  it('handles updateBus action correctly ', () => {
    const action = updateBus({ location: { x: 1, y: 5, f: 'WEST' } });
    const state = { bus: { location: null } };
    const expected = { bus: { location: { x: 1, y: 5, f: 'WEST' } } };
    expect(appReducer(state, action)).toEqual(expected);
  });

  it('handles appendOutput action correctly ', () => {
    const action = appendOutput('1,1,WEST');
    const state = { output: [] };
    const expected = { output: ['1,1,WEST'] };
    expect(appReducer(state, action)).toEqual(expected);
  });

  it('handles startCommandSequence action correctly ', () => {
    const action = startCommandSequence(['']);
    const state = { isRunning: false, output: ['1,1,WEST'] };
    const expected = { isRunning: true, output: [] };
    expect(appReducer(state, action)).toEqual(expected);
  });

  it('handles finishCommandSequence action correctly ', () => {
    const action = finishCommandSequence();
    const state = { isRunning: true, output: ['1,1,WEST'] };
    const expected = { isRunning: false, output: ['1,1,WEST'] };
    expect(appReducer(state, action)).toEqual(expected);
  });
});

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

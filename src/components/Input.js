import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EXAMPLE_COMMANDS } from '../const';
import { startCommandSequence } from '../sagas/actions';

const InputArea = styled.textarea`
  font-family: monospace;
  width: -moz-available;
  width: -webkit-fill-available;
  height: 140px;
  resize: none;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const ExecuteButton = styled.button`
  display: block;
  margin-right: 0;
  margin-left: auto;
`;

const Input = ({ isRunning, dispatch }) => {
  const inputRef = useRef(null);

  const executeCommands = () => {
    const commands = inputRef.current.value.trim().split(/\r?\n/);
    dispatch(startCommandSequence(commands));
  };

  return (
    <>
      <label htmlFor="commandInput">Input:</label>
      <InputArea
        id="commandInput"
        ref={inputRef}
        defaultValue={EXAMPLE_COMMANDS.trim()}
        placeholder="write one command each line"
        disabled={isRunning}
      />
      <ExecuteButton onClick={executeCommands} disabled={isRunning}>
        Execute
      </ExecuteButton>
    </>
  );
};

Input.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isRunning: state.app.isRunning,
});

export default connect(mapStateToProps)(Input);

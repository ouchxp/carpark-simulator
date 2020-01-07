import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const OutputContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 4px;
  background-color: beige;
`;

const OutputEntry = styled.p`
  margin: 0 6px;
  margin-block-start: 2px;
  margin-block-end: 2px;
`;

const Output = ({ output }) => {
  // hide output area when nothing can be displayed
  if (!output.length) return null;
  return (
    <>
      <label>Output:</label>
      <OutputContainer>
        {output.map(x => (
          <OutputEntry key={x}>{x}</OutputEntry>
        ))}
      </OutputContainer>
    </>
  );
};

Output.propTypes = {
  output: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  output: state.app.output,
});

export default connect(mapStateToProps)(Output);

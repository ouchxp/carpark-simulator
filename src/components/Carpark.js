import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import range from 'lodash/range';
import chunk from 'lodash/chunk';
import { Grid, Cell } from 'styled-css-grid';
import { DIMENSION } from '../const';
import BusIcon from './BusIcon';

const CarparkGrid = styled(Grid).attrs(({ dimension }) => ({
  columns: `repeat(${dimension}, 64px)`,
  rows: `repeat(${dimension}, 64px)`,
}))`
  padding: 2px;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const SpaceCell = styled(Cell)`
  background-color: lightblue;
`;

// generating cell coordinates from given dimension, since (0,0) is at bottom left
const coordinates = chunk(range(DIMENSION * DIMENSION), DIMENSION)
  .reverse()
  .flat()
  .map((i) => [i % DIMENSION, Math.floor(i / DIMENSION)]);

const Carpark = ({ bus }) => {
  // a helper function that checks if bus is at given location
  const isBusAt = (x, y) =>
    bus.location && bus.location.x === x && bus.location.y === y;

  return (
    <CarparkGrid dimension={DIMENSION} gap="2px">
      {coordinates.map(([x, y]) => (
        <SpaceCell key={`${x},${y}`}>
          {isBusAt(x, y) && <BusIcon facing={bus.location.f} />}
        </SpaceCell>
      ))}
    </CarparkGrid>
  );
};

Carpark.propTypes = {
  bus: PropTypes.shape({
    location: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      f: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  bus: state.app.bus,
});

export default connect(mapStateToProps)(Carpark);

import React from 'react';
import { shallow } from 'enzyme';
import BusIcon from './BusIcon';

describe('BusIcon', () => {
  it('renders BusIcon with correct rotation when facing EAST', () => {
    const expected = 'rotate(0 32,32)';
    const wrapper = shallow(<BusIcon facing="EAST" />);
    expect(wrapper.html()).toMatch(expected);
  });

  it('renders BusIcon with correct rotation when facing SOUTH', () => {
    const expected = 'rotate(90 32,32)';
    const wrapper = shallow(<BusIcon facing="SOUTH" />);
    expect(wrapper.html()).toMatch(expected);
  });

  it('renders BusIcon with correct rotation when facing WEST', () => {
    const expected = 'rotate(180 32,32)';
    const wrapper = shallow(<BusIcon facing="WEST" />);
    expect(wrapper.html()).toMatch(expected);
  });

  it('renders BusIcon with correct rotation when facing NORTH', () => {
    const expected = 'rotate(270 32,32)';
    const wrapper = shallow(<BusIcon facing="NORTH" />);
    expect(wrapper.html()).toMatch(expected);
  });

  it('renders BusIcon that matches the snapshot', () => {
    const wrapper = shallow(<BusIcon facing="NORTH" />);
    expect(wrapper).toMatchSnapshot();
  });
});

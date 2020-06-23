import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Carpark from './Carpark';

const mockStore = configureStore([]);

describe('Carpark', () => {
  it('renders Bus at correct location', () => {
    const store = mockStore({
      app: {
        bus: { location: { x: 2, y: 3, f: 'NORTH' } },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Carpark />
      </Provider>
    );
    expect(wrapper.find('SpaceCell').at(7).find('BusIcon').exists()).toBe(true);
  });

  it('renders Carpark that matches the snapshot', () => {
    const store = mockStore({
      app: {
        bus: { location: { x: 0, y: 0, f: 'NORTH' } },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Carpark />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Output from './Output';

const mockStore = configureStore([]);

describe('Output', () => {
  it('show all output', () => {
    const store = mockStore({
      app: { output: ['hello', 'world'] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Output />
      </Provider>
    );
    expect(wrapper.find('OutputEntry').get(0).props.children).toBe('hello');
    expect(wrapper.find('OutputEntry').get(1).props.children).toBe('world');
  });

  it('hide component when no output', () => {
    const store = mockStore({
      app: { output: [] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Output />
      </Provider>
    );
    expect(wrapper.find('OutputContainer').exists()).toBe(false);
  });

  it('renders Output that matches the snapshot', () => {
    const store = mockStore({
      app: { output: ['hello', 'world'] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Output />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

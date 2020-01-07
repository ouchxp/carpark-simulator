import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Input from './Input';

const mockStore = configureStore([]);

describe('Input', () => {
  it('disable the execute button and textarea when running', () => {
    const store = mockStore({
      app: { isRunning: true },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    expect(wrapper.find('InputArea').get(0).props.disabled).toBe(true);
    expect(wrapper.find('ExecuteButton').get(0).props.disabled).toBe(true);
  });

  it('dispatch startCommandSequence action when button clicked', () => {
    const store = mockStore({
      app: { isRunning: false },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Input />
      </Provider>
    );

    wrapper.find('ExecuteButton').simulate('click');
    const expected = {
      type: 'appSaga/START_COMMAND_SEQUENCE',
      commands: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'],
    };
    expect(store.getActions()).toEqual([expected]);
  });

  it('renders Input that matches the snapshot', () => {
    const store = mockStore({
      app: { isRunning: false },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Input />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

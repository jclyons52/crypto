import React from 'react';
import ReactDOM from 'react-dom';
import CreateAlertForm from './CreateAlertForm';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateAlertForm/>, div);
});

it('creates new alert', () => {
  // const alertForm = shallow(<CreateAlertForm/>)
  // expect(alertForm.state.base).toBe('');
})
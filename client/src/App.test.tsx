import { mount } from 'enzyme';
import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import App from './App';
import PageNotFound from './Components/PageNotFound';
import UserProfile from './Components/UserProfile';

test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/invalid']}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(PageNotFound)).toHaveLength(1);
  expect(wrapper.find(UserProfile)).toHaveLength(0);
});

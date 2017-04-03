import React from 'react';
import { Provider } from 'react-redux';

import TodoContainer from './components/TodoContainer';
import store from './store';

export default () => (
  <Provider store={store}>
    <TodoContainer/>
  </Provider>
);

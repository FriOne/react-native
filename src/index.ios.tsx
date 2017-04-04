import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import { TodosContainer } from './scenes/Todos/TodosContainer';

export default () => (
  <Provider store={store}>
    <TodosContainer/>
  </Provider>
);

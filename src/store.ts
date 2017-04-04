import { createStore, applyMiddleware } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';

import { rootReducer } from './reducers/root';
import { receiveTodosToStore } from './utils/receiveTodosFromStore';
import { saveTodosToStore } from './utils/saveTodosToStore';

const store = createStore(
  rootReducer,
  applyMiddleware(asyncInitialState.middleware(loadStore)),
);

store.subscribe(onStoreChanges);

function loadStore (currentState) {
  return receiveTodosToStore().then(todos => ({...currentState, todoState: {todos}}));
}

function onStoreChanges() {
  let todoState = store.getState().todoState;
  saveTodosToStore(todoState.todos);
}

export default store;

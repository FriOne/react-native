import { combineReducers, Reducer } from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';

import { todosReducer } from './todos';

export const rootReducer: Reducer<any> = asyncInitialState.outerReducer(combineReducers({
  todoState: todosReducer,
}));

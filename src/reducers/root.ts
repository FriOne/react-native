import { combineReducers, Reducer } from 'redux';

import { todosReducer } from './todos';

export const rootReducer: Reducer<any> = combineReducers({
  todoState: todosReducer,
});

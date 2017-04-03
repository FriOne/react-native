import { TodoActions } from '../actions/TodoActions';
import { Reducer } from 'redux';

import { Todo } from '../models/Todo';
import { FilterType } from '../models/FilterType';

interface TodosState {
  todos: Todo[];
  activeFilter: FilterType;
}

const initialState: TodosState = {
  todos: [],
  activeFilter: FilterType.all,
};

export const todosReducer: Reducer<any> = (state: TodosState = initialState, action: any) => {
  switch (action.type) {
    case TodoActions.CHANGE_FILTER:
      return {...state, activeFilter: action.filterType};

    case TodoActions.ADD_TODO:
      return {...state, todos: [action.todo, ...state.todos]};

    case TodoActions.UPDATE_TODO:
      let index = findTodoIndex(state.todos, action.uuid);
      if (index === -1) {
        return state;
      }
      state.todos[index] = Object.assign(new Todo(), state.todos[index], action.update);
      return {...state, todos: [...state.todos]};
    default:
      return state;
  }
};

function findTodoIndex(todos: Todo[], uuid: string): number {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].uuid === uuid) {
      return i;
    }
  }
  return -1;
}

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
  let index;
  let newTodos;
  switch (action.type) {
    case TodoActions.CHANGE_FILTER:
      return {...state, activeFilter: action.filterType};

    case TodoActions.ADD_TODO:
      let activeFilter = (state.activeFilter === FilterType.done) ? FilterType.active : state.activeFilter;
      return {...state, todos: [action.todo, ...state.todos], activeFilter};

    case TodoActions.UPDATE_TODO:
      index = findTodoIndex(state.todos, action.uuid);
      if (index === -1) {
        return state;
      }
      state.todos[index] = Object.assign(new Todo(), state.todos[index], action.update);
      return {...state, todos: [...state.todos]};

    case TodoActions.DELETE_TODO:
      index = findTodoIndex(state.todos, action.uuid);
      if (index === -1) {
        return state;
      }

      newTodos = [...state.todos];
      newTodos.splice(index, 1);

      return {...state, todos: newTodos};

    case TodoActions.MARK_ALL_AS_READ:
      newTodos = [...state.todos];
      newTodos.map(todo => (todo.completed = true));
      return {...state, todos: newTodos};

    case TodoActions.CLEAR_DONE:
      return {...state, todos: state.todos.filter(todo => !todo.completed)};

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

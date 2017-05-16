import React, { Component } from 'react';

import { Todos } from './Todos';
import { FilterType } from '../../models/FilterType';
import { Todo } from '../../models/Todo';
import { TodoActions } from '../../actions/TodoActions';
import { connect } from '../../utils/connect';

@connect(mapStateToProps, mapDispatchToProps)
export class TodosContainer extends Component<any, any> {
  render() {
    let {todos, activeFilter} = this.props;
    let {onAddNewTodo, onTodoChange, onTodoDelete, onFilterChange, onMarkAllAsDone, onClearDone} = this.props;

    return (
      <Todos
        todos={todos}
        activeFilter={activeFilter}
        onAddNewTodo={onAddNewTodo}
        onTodoChange={onTodoChange}
        onTodoDelete={onTodoDelete}
        onFilterChange={onFilterChange}
        onMarkAllAsDone={onMarkAllAsDone}
        onClearDone={onClearDone}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: getFilteredTodos(state.todoState.todos, state.todoState.activeFilter),
    activeFilter: state.todoState.activeFilter || FilterType.all,
  };
}

function getFilteredTodos (todos: Todo[], type: FilterType) {
  if (FilterType.active === type) {
    return todos.filter(todo => !todo.completed);
  }
  if (FilterType.done === type) {
    return todos.filter(todo => todo.completed);
  }
  return [...todos];
}

function mapDispatchToProps(dispatch) {
  return {
    onAddNewTodo: (text: string) => {
      let newTodo = new Todo();
      newTodo.text = text;
      dispatch(TodoActions.addTodo(newTodo));
    },
    onTodoChange: (uuid: string, update: any) => {
      dispatch(TodoActions.updateTodo(uuid, update));
    },
    onTodoDelete: (uuid: string) => {
      dispatch(TodoActions.deleteTodo(uuid));
    },
    onFilterChange: (type: FilterType) => {
      dispatch(TodoActions.changeFilter(type));
    },
    onClearDone: () => {
      dispatch(TodoActions.clearDone());
    },
    onMarkAllAsDone: () => {
      dispatch(TodoActions.markAllAsRead());
    },
  }
}

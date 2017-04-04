import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect, ProviderProps } from 'react-redux';
import Tabs from 'react-native-tabs';

import { TodoList } from './TodoList/index';
import { AddNewTodo } from './AddNewTodo/index';
import { TodoActions } from '../../actions/TodoActions';
import { Todo } from '../../models/Todo';
import { FilterType } from '../../models/FilterType';
import componentStyles from './styles';

interface Props extends ProviderProps {
  todos: Todo[];
  activeFilter: FilterType;
  onAddNewTodo: (text: string) => void;
  onTodoChange: (uuid: string, update: any) => void;
  onTodoDelete: (uuid: string) => void;
  onFilterChange: (type: FilterType) => void;
  onMarkAllAsDoneClick: () => void;
  onClearDoneClick: () => void;
}

interface State {}

let mapStateToProps = (state) => ({
  todos: getFilteredTodos(state.todoState.todos, state.todoState.activeFilter),
  activeFilter: state.todoState.activeFilter,
});

let getFilteredTodos = (todos: Todo[], type: FilterType) => {
  if (FilterType.active === type) {
    return todos.filter(todo => !todo.completed);
  }
  if (FilterType.done === type) {
    return todos.filter(todo => todo.completed);
  }
  return [...todos];
};

let mapDispatchToProps = (dispatch) => ({
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
  onClearDoneClick: () => {
    dispatch(TodoActions.clearDone());
  },
  onMarkAllAsDoneClick: () => {
    dispatch(TodoActions.markAllAsRead());
  },
});

let TextNoType = Text as any;
let noTodosMessages = {
  [FilterType.all]: 'You don\'t have any todos',
  [FilterType.done]: 'You haven\'t done any tasks',
  [FilterType.active]: 'You don\'t have any active todos',
};

class TodoContainer extends Component<Props, State> {

  getActiveButtons() {
    let {todos, activeFilter} = this.props;

    if (this.props.todos.length === 0) {
      return [];
    }
    let buttons = [];
    if (
      [FilterType.active, FilterType.all].indexOf(activeFilter) !== -1
      && todos.filter(todo => !todo.completed).length
    ) {
      buttons.push(
        <TouchableHighlight
          underlayColor='#99d9f4'
          onPress={this.props.onMarkAllAsDoneClick}
        >
          <Text>Mark all as Done</Text>
        </TouchableHighlight>
      );
    }

    if (
      [FilterType.done, FilterType.all].indexOf(activeFilter) !== -1
      && todos.filter(todo => todo.completed).length
    ) {
      buttons.push(
        <TouchableHighlight
          underlayColor='#99d9f4'
          onPress={this.props.onClearDoneClick}
        >
          <Text>Clear Done</Text>
        </TouchableHighlight>
      );
    }
    return buttons;
  }

  render() {
    let {todos, activeFilter, onAddNewTodo, onTodoChange, onTodoDelete, onFilterChange} = this.props;
    return (
      <View style={componentStyles.container}>
        <AddNewTodo onAdd={onAddNewTodo}/>

        {(todos.length === 0) && <Text>{noTodosMessages[activeFilter]}</Text>}
        {this.getActiveButtons()}

        <TodoList
          todos={todos}
          onTodoChange={onTodoChange}
          onTodoDelete={onTodoDelete}
        />
        <Tabs
          selected={activeFilter}
          style={{backgroundColor:'white'}}
          selectedStyle={{color:'red'}}
          onSelect={(el) => onFilterChange(el.props.name)}
        >
          <TextNoType name={FilterType.all}>All</TextNoType>
          <TextNoType name={FilterType.active}>Active</TextNoType>
          <TextNoType name={FilterType.done}>Done</TextNoType>
        </Tabs>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);


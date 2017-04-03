import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect, ProviderProps } from 'react-redux';
import Tabs from 'react-native-tabs';

import { TodoList } from './TodoList/index';
import { AddNewTodo } from './AddNewTodo/index';
import { Todo } from '../../models/Todo';
import { TodoActions } from '../../actions/TodoActions';
import componentStyles from './styles';
import { FilterType } from '../../models/FilterType';

interface Props extends ProviderProps {
  todos: Todo[];
  activeFilter: FilterType;
  onAddNewTodo: (text: string) => void;
  onTodoChange: (uuid: string, update: any) => void;
  onFilterChange: (type: FilterType) => void;
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
  onFilterChange: (type: FilterType) => {
    dispatch(TodoActions.changeFilter(type));
  },
});

let TextNoType = Text as any;

class TodoContainer extends Component<Props, State> {
  render() {
    let {todos, activeFilter, onAddNewTodo, onTodoChange, onFilterChange} = this.props;
    return (
      <View style={componentStyles.container}>
        <AddNewTodo
          onAdd={onAddNewTodo}
        />
        <TodoList
          todos={todos}
          onTodoChange={onTodoChange}
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


import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Tabs from 'react-native-tabs';

import { FilterType } from '../../models/FilterType';
import { Todo } from '../../models/Todo';
import { TodoList } from './components/TodoList';
import { AddNewTodo } from './components/AddNewTodo';
import componentStyles from './styles';

interface Props {
  todos: Todo[];
  activeFilter: FilterType;
  onAddNewTodo: (text: string) => void;
  onTodoChange: (uuid: string, update: any) => void;
  onTodoDelete: (uuid: string) => void;
  onFilterChange: (type: FilterType) => void;
  onMarkAllAsDone: () => void;
  onClearDone: () => void;
}

interface State {}

let TextNoType = Text as any;

export class Todos extends Component<Props, State> {

  static noTodosMessages = {
    [FilterType.all]: 'You don\'t have any todos',
    [FilterType.done]: 'You haven\'t done any tasks',
    [FilterType.active]: 'You don\'t have any active todos',
  };

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
          onPress={this.props.onMarkAllAsDone}
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
          onPress={this.props.onClearDone}
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

        {(todos.length === 0) && <Text>{Todos.noTodosMessages[activeFilter]}</Text>}
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

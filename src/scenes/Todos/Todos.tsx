import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, NativeModules } from 'react-native';
import Tabs from 'react-native-tabs';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

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

interface State {
  fabIsActive: boolean;
  statusBarHeight: number;
}

let TextNoType = Text as any;

export class Todos extends Component<Props, State> {

  state = {
    fabIsActive: false,
    statusBarHeight: 0,
  };

  componentWillMount() {
    if (Platform.OS === 'ios') {
      const {StatusBarManager} = NativeModules;
      StatusBarManager.getHeight(statusBar => {
        this.setState({statusBarHeight: statusBar.height});
      });
    }
  }

  getActiveButtons() {
    let {todos, activeFilter} = this.props;

    if (todos.length === 0) {
      return [];
    }
    let buttons = [];
    if (
      [FilterType.active, FilterType.all].indexOf(activeFilter) !== -1
      && todos.filter(todo => !todo.completed).length
    ) {
      buttons.push(
        <ActionButton.Item
          key="1"
          buttonColor='#9b59b6'
          title="Mark all as Done"
          onPress={this.props.onMarkAllAsDone}
        >
          <Icon name={'check'} color="#fff" size={20}/>
        </ActionButton.Item>
      );
    }
    if (
      [FilterType.done, FilterType.all].indexOf(activeFilter) !== -1
      && todos.filter(todo => todo.completed).length
    ) {
      buttons.push(
        <ActionButton.Item
          key="2"
          buttonColor='#9b59b6'
          title="Clear Done"
          onPress={this.props.onClearDone}
        >
          <Icon name={'eraser'} color="#fff" size={20}/>
        </ActionButton.Item>
      );
    }
    return <ActionButton
      buttonColor="rgba(231,76,60,1)"
      autoInactive={true}
    >
      {buttons}
    </ActionButton>;
  }

  render() {
    let {todos, activeFilter, onAddNewTodo, onTodoChange, onTodoDelete, onFilterChange} = this.props;
    let hasTodos = (todos.length !== 0);

    const {statusBarHeight} = this.state;
    const tabsStyle = StyleSheet.flatten([componentStyles.tabs, {height: 50 + statusBarHeight}]);
    const tabStyle = StyleSheet.flatten([componentStyles.tab, {lineHeight: 36 + statusBarHeight}]);
    const containerStyle = StyleSheet.flatten([componentStyles.container, {paddingTop: 50 + statusBarHeight}]);

    return (
      <View style={containerStyle}>
        <AddNewTodo onAdd={onAddNewTodo} autoFocus={hasTodos}/>

        <TodoList
          todos={todos}
          onTodoChange={onTodoChange}
          onTodoDelete={onTodoDelete}
        />
        <Tabs
          selected={activeFilter}
          style={tabsStyle}
          selectedStyle={componentStyles.activeTab}
          onSelect={(el) => onFilterChange(el.props.name)}
        >
          <TextNoType name={FilterType.all} style={tabStyle}>ALL</TextNoType>
          <TextNoType name={FilterType.active} style={tabStyle}>ACTIVE</TextNoType>
          <TextNoType name={FilterType.done} style={tabStyle}>DONE</TextNoType>
        </Tabs>
        {this.getActiveButtons()}
      </View>
    );
  }
}

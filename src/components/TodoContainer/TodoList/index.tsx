import React, { Component } from 'react';
import { ListView } from 'react-native';

import { Todo } from '../../../models/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onTodoChange: (uuid: string, update: any) => void;
  onTodoDelete: (uuid: string) => void;
}

interface State {}

export class TodoList extends Component<Props, State> {
  dataSource = new ListView.DataSource({
    rowHasChanged: (todo1, todo2) => (todo1 !== todo2),
  });

  render() {
    let dataSource = this.dataSource.cloneWithRows(this.props.todos);
    return (
      <ListView
        dataSource={dataSource}
        keyboardShouldPersistTaps="handled"
        enableEmptySections={true}
        renderRow={(todo) => <TodoItem
          todo={todo}
          onChange={this.props.onTodoChange}
          onDelete={this.props.onTodoDelete}
        />}
      />
    );
  }
}

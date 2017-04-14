import React, { Component } from 'react';
import { View, ListView } from 'react-native';

import { Todo } from '../../../../models/Todo';
import { TodoItem } from '../TodoItem';
import componentStyles from './styles';

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
        renderSeparator={(sectionId, rowId) => <View
          key={rowId}
          style={componentStyles.separator}
        />}
        renderRow={(todo, sectionID, rowId) => <TodoItem
          key={rowId}
          todo={todo}
          onChange={this.props.onTodoChange}
          onDelete={this.props.onTodoDelete}
        />}
      />
    );
  }
}

import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ViewStyle } from 'react-native';

import { Todo } from '../../../../models/Todo';
import { TodoEdit } from './TodoEdit';
import componentStyles from './styles';

interface Props {
  todo: Todo;
  onChange: (uuid: string, update: any) => void;
}

interface State {
  editing: boolean;
}

export class TodoItem extends Component<Props, State> {
  state = {
    editing: false,
  };

  @autobind
  onSave(text: string) {
    this.props.onChange(this.props.todo.uuid, {text});
    this.setState({editing: false});
  }

  @autobind
  onCompleteToggle() {
    this.props.onChange(this.props.todo.uuid, {completed: !this.props.todo.completed});
    this.setState({editing: false});
  }

  @autobind
  onEdit() {
    this.setState({editing: true});
  }

  @autobind
  onCancel() {
    this.setState({editing: false});
  }

  render() {
    let todo = this.props.todo;
    let backgroundColor = this.props.todo.completed ? '#c3ffb6' : '#fff';
    if (this.state.editing) {
      return <TodoEdit
        text={todo.text}
        onSave={this.onSave}
        onCancel={this.onCancel}
      />;
    }
    return (
      <View style={[componentStyles.container, {backgroundColor: backgroundColor}]}>
        <Text
          style={componentStyles.text}
          onPress={this.onEdit}
        >
          {todo.text}
        </Text>
        <TouchableHighlight
          style={componentStyles.editButton}
          onPress={this.onEdit}
        >
          <Text>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={componentStyles.completeButton}
          onPress={this.onCompleteToggle}
        >
          <Text>Complete</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

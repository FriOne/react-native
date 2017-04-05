import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';

import { Todo } from '../../../../models/Todo';
import componentStyles from './styles';

interface Props {
  todo: Todo;
  onChange: (uuid: string, update: any) => void;
  onDelete: (uuid: string) => void;
}

interface State {
  editing: boolean;
  text: string;
}

export class TodoItem extends Component<Props, State> {

  state = {
    editing: false,
    text: '',
  };

  componentWillReceiveProps(nextProps) {
    this.state.text = nextProps.todo.text;
  }

  @autobind
  onSave() {
    this.props.onChange(this.props.todo.uuid, {text: this.state.text});
    this.setState({editing: false});
  }

  @autobind
  onCompleteToggle() {
    this.props.onChange(this.props.todo.uuid, {completed: !this.props.todo.completed});
    this.setState({editing: false});
  }

  @autobind
  onDelete() {
    this.props.onDelete(this.props.todo.uuid);
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
      return <TextInput
        value={this.state.text}
        autoFocus={true}
        underlineColorAndroid="transparent"
        onBlur={this.onSave}
        onSubmitEditing={this.onSave}
        onChangeText={(text) => this.setState({text})}
      />;
    }
    return (
      <View style={[componentStyles.container, {backgroundColor: backgroundColor}]}>
        <Text style={componentStyles.text} onPress={this.onEdit}>{todo.text}</Text>
        <TouchableHighlight style={componentStyles.editButton} onPress={this.onEdit}>
          <Text>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight style={componentStyles.completeButton} onPress={this.onCompleteToggle}>
          <Text>Complete</Text>
        </TouchableHighlight>
        <TouchableHighlight style={componentStyles.deleteButton} onPress={this.onDelete}>
          <Text>Delete</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import CheckBox from 'react-native-icon-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Todo } from '../../../../models/Todo';
import componentStyles from './styles';

interface Props {
  key: any;
  todo: Todo;
  onChange: (uuid: string, update: any) => void;
  onDelete: (uuid: string) => void;
}

interface State {
  text: string;
}

export class TodoItem extends Component<Props, State> {

  state = {
    text: '',
  };

  componentDidMount() {
    this.setState({text: this.props.todo.text});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.todo.text});
  }

  @autobind
  onSave() {
    if (this.state.text.trim() === '') {
      return;
    }
    this.props.onChange(this.props.todo.uuid, {text: this.state.text});
  }

  @autobind
  onBlur() {
    if (this.state.text.trim() !== '') {
      this.onSave();
    }
    else {
      this.state.text = this.props.todo.text;
    }
  }

  @autobind
  onCompleteToggle() {
    this.props.onChange(this.props.todo.uuid, {completed: !this.props.todo.completed});
  }

  @autobind
  onDelete() {
    this.props.onDelete(this.props.todo.uuid);
  }

  render() {
    let todo = this.props.todo;
    let inner;
    if (todo.completed) {
      inner = <Text style={[componentStyles.text, componentStyles.textCompleted]}>{todo.text}</Text>;
    }
    else {
      inner = <TextInput
        style={componentStyles.input}
        value={this.state.text}
        underlineColorAndroid="transparent"
        onBlur={this.onBlur}
        onSubmitEditing={this.onSave}
        onChangeText={(text) => this.setState({text})}
      />;
    }
    return (
      <View style={componentStyles.container}>
        <CheckBox
          backgroundColor="#fff"
          borderRadius={0}
          iconStyle={componentStyles.checkboxIconStyle}
          checkedIconStyle={componentStyles.checkboxCheckedIconStyle}
          size={30}
          color="#68686e"
          onPress={this.onCompleteToggle}
          checked={this.props.todo.completed}
        />
        {inner}
        <TouchableHighlight style={componentStyles.deleteButton} onPress={this.onDelete}>
          <Icon style={componentStyles.trashIcon} name={'trash'} size={30} color="#fff" />
        </TouchableHighlight>
      </View>
    );
  }
}

import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import componentStyles from './styles';

interface Props {
  autoFocus: boolean;
  onAdd: (text: string) => void;
}

interface State {
  text: string;
}

export class AddNewTodo extends Component<Props, State> {

  state = {
    text: '',
  };

  @autobind
  onAdd() {
    if (this.state.text.trim() === '') {
      (this.refs.input as any).focus();
      return;
    }
    this.props.onAdd(this.state.text);
    this.setState({text: ''});
  }

  @autobind
  onBlur() {
    this.setState({text: ''});
  }

  render() {
    return (
      <View style={componentStyles.container}>
        <TouchableHighlight
          style={componentStyles.button}
          underlayColor='#99d9f4'
          disabled={!this.state.text.trim()}
          onPress={this.onAdd}
        >
          <Icon style={componentStyles.plusIcon} name={'plus-square'} size={26}/>
        </TouchableHighlight>
        <View style={componentStyles.inputContainer}>
          <TextInput
            value={this.state.text}
            style={componentStyles.input}
            underlineColorAndroid="transparent"
            autoFocus={this.props.autoFocus}
            onBlur={this.onBlur}
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.onAdd}
            placeholder="New todo"
            ref="input"
          />
        </View>
      </View>
    );
  }
}

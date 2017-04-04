import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';

import componentStyles from './styles';

interface Props {
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
        <View style={componentStyles.inputContainer}>
          <TextInput
            value={this.state.text}
            style={componentStyles.input}
            underlineColorAndroid="transparent"
            autoFocus={true}
            onBlur={this.onBlur}
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.onAdd}
            placeholder="Add new Todo here ->"
          />
        </View>
        <TouchableHighlight
          style={componentStyles.button}
          underlayColor='#99d9f4'
          disabled={!this.state.text.trim()}
          onPress={this.onAdd}
        >
          <Text>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import componentStyles from './styles';

interface Props {
  text: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

interface State {
  text: string;
}

export class TodoEdit extends Component<Props, State> {

  state = {
    text: this.props.text || '',
  };

  @autobind
  onSave() {
    this.props.onSave(this.state.text);
  }

  render() {
    return (
      <View style={componentStyles.container}>
        <View style={componentStyles.inputContainer}>
          <TextInput
            value={this.state.text}
            style={componentStyles.inputContainer}
            autoFocus={true}
            underlineColorAndroid="transparent"
            onSubmitEditing={this.onSave}
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <TouchableHighlight
          style={componentStyles.saveButton}
          onPress={this.onSave}
        >
          <Text>Save</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={componentStyles.cancelButton}
          onPress={this.props.onCancel}
        >
          <Text>Cancel</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

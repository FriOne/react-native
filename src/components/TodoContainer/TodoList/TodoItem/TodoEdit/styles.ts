import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../../variables';

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  } as ViewStyle,
  inputContainer: {
    flex: 1,
    borderColor: COLOR_SECONDARY,
    borderWidth: 1,
  } as ViewStyle,
  input: {
    padding: 10,
    height: 40,
  } as TextStyle,
  saveButton: {
    flex: 0,
    width: 50,
    backgroundColor: COLOR_PRIMARY,
  } as ViewStyle,
  cancelButton: {
    flex: 0,
    width: 50,
    backgroundColor: COLOR_PRIMARY,
  } as ViewStyle,
});

export default componentStyles;

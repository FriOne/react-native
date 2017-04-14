import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../../styles/variables';

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#8E8E8E',
  } as ViewStyle,
  inputContainer: {
    flex: 1,
  } as ViewStyle,
  input: {
    height: 60,
    padding: 10,
    fontSize: 16,
  } as TextStyle,
  button: {
    flex: 0,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  plusIcon: {
    flex: 1,
    marginTop: 16,
  } as ViewStyle,
});

export default componentStyles;

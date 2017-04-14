import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLOR_ERROR, COLOR_PRIMARY } from '../../../../styles/variables';

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  } as ViewStyle,
  checkboxIconStyle: {
    paddingTop: 6,
    paddingLeft: 16,
  } as ViewStyle,
  checkboxCheckedIconStyle: {

  } as ViewStyle,
  text: {
    flex: 1,
    height: 60,
    padding: 10,
    paddingTop: 19,
    fontSize: 16,
    backgroundColor: '#fff',
  } as TextStyle,
  textCompleted: {
    textDecorationLine: 'line-through',
  } as TextStyle,
  input: {
    flex: 1,
    height: 60,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  } as TextStyle,
  completeButton: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
  } as ViewStyle,
  deleteButton: {
    flex: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_ERROR,
  } as ViewStyle,
  trashIcon: {
    flex: 1,
    marginTop: 13,
  } as ViewStyle,
});

export default componentStyles;

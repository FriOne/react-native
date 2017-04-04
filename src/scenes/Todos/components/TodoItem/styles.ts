import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLOR_PRIMARY } from '../../../../styles/variables';

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  } as ViewStyle,
  text: {
    flex: 1,
    padding: 5,
    lineHeight: 40,
    borderColor: '#000',
    borderWidth: 1,
  } as TextStyle,
  editButton: {
    flex: 0,
    width: 50,
    backgroundColor: COLOR_PRIMARY,
  } as ViewStyle,
  completeButton: {
    flex: 0,
    width: 50,
    backgroundColor: COLOR_PRIMARY,
  } as ViewStyle,
  deleteButton: {
    flex: 0,
    width: 50,
    backgroundColor: COLOR_PRIMARY,
  } as ViewStyle,
});

export default componentStyles;

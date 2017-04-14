import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../styles/variables';

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  } as ViewStyle,
  empty: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#8E8E8E',
    textAlign: 'center',
    backgroundColor: '#fff',
  } as TextStyle,
  tabs: {
    height: 50,
    top: 0,
    backgroundColor: COLOR_PRIMARY,
    borderWidth: 1,
    borderColor: '#3f8ebf',
  } as ViewStyle,
  tab: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderBottomWidth: 0,
    borderBottomColor: COLOR_PRIMARY,
    backgroundColor: COLOR_PRIMARY,
    fontSize: 16,
    lineHeight: 36,
    color: '#fff',
  } as TextStyle,
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: COLOR_SECONDARY,
  } as TextStyle,
});

export default componentStyles;

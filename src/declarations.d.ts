declare module 'tcomb-form-native' {
  const t: any;
  export = t;
}

declare module 'react-native-button' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface Props {
    style?: ViewStyle;
    styleDisabled?: ViewStyle;
    onPress?: () => any;
  }

  export default class Button extends Component<Props, any> {
  }
}

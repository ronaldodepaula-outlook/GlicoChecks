declare module '@expo/vector-icons' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';

  export const MaterialIcons: ComponentType<any>;
  export const FontAwesome5: ComponentType<any>;
  const _default: any;
  export default _default;
}

declare module '@expo/vector-icons/*' {
  const icon: any;
  export default icon;
}

import React from 'react';
import { View } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  color?: string;
  name: string;
  size: number;
};

const Icon = ({ color, name, size }: Props) => (
  <View
    testID="icon"
    color={color}
    name={name}
    size={size}
  />
);

export default Icon;

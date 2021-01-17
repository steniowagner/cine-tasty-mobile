import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  color?: string;
  name: string;
  size: number;
};

const Icon = ({ color, name, size }: Props) => (
  <MaterialCommunityIcons
    testID="icon"
    color={color}
    name={name}
    size={size}
  />
);

export default Icon;

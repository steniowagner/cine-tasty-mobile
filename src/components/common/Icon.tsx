import React from 'react';
import { Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

type Props = {
  color?: string;
  name: string;
  size: number;
};

const CustomIcon = styled(MaterialCommunityIcons)`
  margin-top: ${Platform.OS === 'ios' ? 2 : 0}px;
`;

const Icon = ({ color, name, size }: Props) => (
  <CustomIcon
    testID="icon"
    color={color}
    name={name}
    size={size}
  />
);

export default Icon;

import React from 'react';
import { Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

const CustomIcon = styled(MaterialCommunityIcons)`
  margin-top: ${Platform.OS === 'ios' ? 2 : 0}px;
`;

type Props = {
  color?: string;
  name: string;
  size: number;
};

const Icon = ({ color, name, size }: Props) => (
  <CustomIcon
    testID="icon"
    color={color}
    name={name}
    size={size}
  />
);

export default Icon;

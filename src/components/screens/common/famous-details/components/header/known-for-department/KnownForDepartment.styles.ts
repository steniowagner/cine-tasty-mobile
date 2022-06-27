import {View} from 'react-native';
import styled from 'styled-components/native';

export const KnownForDepartmentWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  padding-vertical: ${({theme}) => theme.metrics.extraSmallSize}px;
  padding-horizontal: ${({theme}) => theme.metrics.smallSize}px;
  background-color: ${({theme}) => theme.colors.primary};
  align-self: flex-start;
`;

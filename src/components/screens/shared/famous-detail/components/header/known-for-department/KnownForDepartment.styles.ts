import {View} from 'react-native';
import styled from 'styled-components/native';

type KnownForDepartmentWrapperStyleProps = {
  opacity: number;
  width: number;
};

export const KnownForDepartmentWrapper = styled(
  View,
)<KnownForDepartmentWrapperStyleProps>`
  width: ${({theme, width}) => theme.metrics.largeSize + width}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.metrics.extraSmallSize}px;
  padding-vertical: ${({theme}) => theme.metrics.extraSmallSize}px;
  background-color: ${({theme}) => theme.colors.primary};
  opacity: ${({opacity}) => opacity};
`;

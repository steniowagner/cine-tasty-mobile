import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  margin-top: ${({theme}) => theme.metrics.mediumSize}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

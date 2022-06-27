import {View} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: ${({theme}) => theme.metrics.mediumSize}px;
`;

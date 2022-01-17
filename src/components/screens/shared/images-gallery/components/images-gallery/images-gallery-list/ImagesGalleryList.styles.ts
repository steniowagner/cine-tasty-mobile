import {View} from 'react-native';
import styled from 'styled-components/native';

export const PlaceholderListItem = styled(View)`
  width: ${({theme}) => theme.metrics.width}px;
  height: 100%;
`;

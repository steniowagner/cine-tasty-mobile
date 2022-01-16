import { View } from 'react-native';
import styled from 'styled-components';

export const PlaceholderListItem = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
`;

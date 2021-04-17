import { View } from 'react-native';
import styled from 'styled-components';

export const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  justify-content: center;
  align-items: center;
`;

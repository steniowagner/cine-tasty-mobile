import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(ScrollView).attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingLeft: theme.metrics.md,
  },
}))`
  margin-bottom: ${({ theme }) => theme.metrics.xl * 2}px;
`;

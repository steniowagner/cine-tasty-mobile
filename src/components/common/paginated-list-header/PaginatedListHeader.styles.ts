import styled from 'styled-components/native';

export const ReloadButton = styled.TouchableOpacity.attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.lg,
    bottom: theme.metrics.lg,
    left: theme.metrics.lg,
    right: theme.metrics.lg,
  },
}))`
  align-self: center;
  margin-top: ${({ theme }) => theme.metrics.lg}px;
`;

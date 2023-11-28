import styled from 'styled-components/native';

export const SeasonWrapper = styled.TouchableOpacity`
  align-self: flex-start;
  margin-right: ${({ theme }) => theme.metrics.lg}px;
  padding: ${({ theme }) => theme.metrics.md}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
`;

export const List = styled.ScrollView.attrs(({ theme }) => ({
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: theme.metrics.md,
  },
  horizontal: true,
}))``;

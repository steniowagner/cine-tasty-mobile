import styled from 'styled-components/native';

export const List = styled.FlatList.attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingLeft: theme.metrics.md,
  },
}))``;

import styled from 'styled-components/native';

export const Wrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
  margin-bottom: ${({ theme }) => theme.metrics.lg * 2}px;
`;

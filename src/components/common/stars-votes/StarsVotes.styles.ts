import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const StarsWrapper = styled.View`
  flex-direction: row;
  margin-left: ${({ theme }) => theme.metrics.xs}px;
`;

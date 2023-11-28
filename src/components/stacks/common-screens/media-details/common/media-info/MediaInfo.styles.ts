import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.metrics.sm}px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const InfoCellWrapper = styled.View`
  width: 46%;
  margin-vertical: ${({ theme }) => theme.metrics.sm}px;
  margin-horizontal: ${({ theme }) => theme.metrics.xs}px;
`;

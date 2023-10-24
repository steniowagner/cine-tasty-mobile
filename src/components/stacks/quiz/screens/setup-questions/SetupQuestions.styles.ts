import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('10')}px;
`;

export const RoundedButtonWrapper = styled.View`
  align-items: center;
`;

export const SectionWrapper = styled.View.attrs(() => ({
  testID: 'section-wrapper',
}))`
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('8')}px;
`;

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '../Icon';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('27.5%')}px;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
`;

const Title = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  text-align: center;
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  text-align: center;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const Suggestion = styled(Text).attrs({
  numberOfLines: 2,
})`
  text-align: center;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

const AdviseIcon = styled(Icon).attrs(({ theme, name }) => ({
  size: theme.metrics.getWidthFromDP('20%'),
  color: theme.colors.primary,
  name,
}))``;

export type Props = {
  description: string;
  suggestion: string;
  title: string;
  icon: string;
};

const Advise = ({
  description, suggestion, title, icon,
}: Props) => (
  <Wrapper>
    <IconWrapper
      testID="icon-wrapper"
    >
      <AdviseIcon
        name={icon}
      />
    </IconWrapper>
    {!!title && <Title>{title}</Title>}
    {!!description && <Description>{description}</Description>}
    {!!suggestion && <Suggestion>{suggestion}</Suggestion>}
  </Wrapper>
);

export default Advise;

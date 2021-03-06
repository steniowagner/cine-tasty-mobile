import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import { SupportedIcons } from 'components/common/svg-icon/getXML';
import SVGIcon from 'components/common/svg-icon/SVGIcon';
import metrics from 'styles/metrics';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('45%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('27.5%')}px;
  background-color: ${({ theme }) => theme.colors.primary};
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

export type Props = {
  icon: SupportedIcons;
  description: string;
  suggestion: string;
  title: string;
};

const Advise = ({
  description, suggestion, title, icon,
}: Props) => (
  <Wrapper
    testID="advise-wrapper"
  >
    <IconWrapper
      testID="icon-wrapper"
    >
      <SVGIcon
        size={metrics.getWidthFromDP('20%')}
        colorThemeRef="buttonText"
        id={icon}
      />
    </IconWrapper>
    {!!title && <Title>{title}</Title>}
    {!!description && <Description>{description}</Description>}
    {!!suggestion && <Suggestion>{suggestion}</Suggestion>}
  </Wrapper>
);

export default Advise;

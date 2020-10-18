import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import { formatDate } from 'utils/formatters';
import Icon from 'components/common/Icon';

const Wrapper = styled(View)`
  flex-direction: row;
  width: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
  border-radius: ${({ theme }) => theme.metrics.height}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const IconWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: white;
`;

const DateText = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize * 1.5}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.buttonText};
`;

const CrossIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('5%'),
  color: 'black',
}))``;

type Props = {
  deathDate: string;
};

const DeathInfo = ({ deathDate }: Props) => {
  const dateText = formatDate(deathDate);

  return (
    <Wrapper
      testID="death-day-info"
    >
      <IconWrapper>
        <CrossIcon
          name="christianity"
        />
      </IconWrapper>
      <DateText>{dateText}</DateText>
    </Wrapper>
  );
};

export default DeathInfo;

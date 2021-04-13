import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { formatDate } from '@utils/formatters';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
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
        <SVGIcon
          size={metrics.extraLargeSize}
          colorThemeRef="buttonText"
          id="christianity"
        />
      </IconWrapper>
      <DateText>{dateText}</DateText>
    </Wrapper>
  );
};

export default DeathInfo;

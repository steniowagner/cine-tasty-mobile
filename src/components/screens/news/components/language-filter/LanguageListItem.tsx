import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '../../../../common/Icon';

const Wrapper = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const LanguageText = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: rgba(0, 0, 0, 0.8);
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
`;

const FlagWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const CheckIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'check-circle-outline',
  color: theme.colors.primary,
  size: theme.metrics.getWidthFromDP('10%'),
}))``;

const ContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  name: string;
  Flag: any;
};

const LanguageListItem = ({ name, Flag }: Props) => (
  <Wrapper>
    <ContentWrapper>
      <FlagWrapper>
        <Flag />
      </FlagWrapper>
      <LanguageText>{name}</LanguageText>
    </ContentWrapper>
    <CheckIcon />
  </Wrapper>
);

export default LanguageListItem;

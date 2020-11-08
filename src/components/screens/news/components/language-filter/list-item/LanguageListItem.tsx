import React, { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';
import metrics from 'styles/metrics';

interface SelectedItemStyleProps {
  readonly isSelected: boolean;
}

export const ITEM_LIST_HEIGHT = metrics.getWidthFromDP('20%');

const Wrapper = styled(TouchableOpacity)`
  height: ${ITEM_LIST_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const LanguageText = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-family: CircularStd-Bold;
`;

const OutterFlagWrapper = styled(View)<SelectedItemStyleProps>`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : 'white')};
  justify-content: center;
  align-items: center;
`;

const InnerFlagWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const CheckIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  name: 'checkbox-marked-circle',
  color: theme.colors.primary,
}))``;

const ContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  Flag: () => JSX.Element;
  onPress: () => void;
  isSelected: boolean;
  name: string;
};

const LanguageListItem = ({
  isSelected, onPress, name, Flag,
}: Props) => (
  <Wrapper
    testID="language-filter-list-item"
    onPress={onPress}
  >
    <ContentWrapper>
      <OutterFlagWrapper
        testID="outter-flag-wrapper"
        isSelected={isSelected}
      >
        <InnerFlagWrapper>
          <Flag />
        </InnerFlagWrapper>
      </OutterFlagWrapper>
      <LanguageText
        testID="language-text"
      >
        {name}
      </LanguageText>
    </ContentWrapper>
    {isSelected && <CheckIcon />}
  </Wrapper>
);

const shouldComponentUpdate = (previousState: Props, nextState: Props): boolean => (previousState.isSelected || !nextState.isSelected)
  && (!previousState.isSelected || nextState.isSelected);

export default memo(LanguageListItem, shouldComponentUpdate);

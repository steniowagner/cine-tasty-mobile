import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const NextTouchable = styled(TouchableOpacity)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: ${({ theme }) => theme.metrics.smallSize}px;
  border-bottom-right-radius: ${({ theme }) => theme.metrics.smallSize}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const NextText = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.buttonText};
  text-align: center;
  text-transform: uppercase;
`;

type Props = {
  onPress: () => void;
  isDisabled: boolean;
};

const NextButton = ({ onPress, isDisabled }: Props) => {
  const { t } = useTranslation();

  return (
    <NextTouchable
      disabled={isDisabled}
      testID="next-button"
      onPress={onPress}
    >
      <NextText>{t('translations:quiz:next')}</NextText>
    </NextTouchable>
  );
};

export default NextButton;

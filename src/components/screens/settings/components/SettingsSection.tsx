import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
`;

const SectionTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionDescription = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const TextWrapper = styled(View)`
  width: 85%;
`;

const ArrowRightIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('8%'),
  color: theme.colors.text,
  name: 'arrow-right',
}))``;

export type Props = {
  onPress: () => void;
  description: string;
  title: string;
};

const SettingsSection = ({ description, onPress, title }: Props) => (
  <Wrapper
    onPress={onPress}
    testID="settings-section-button"
  >
    <TextWrapper>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
    </TextWrapper>
    <ArrowRightIcon />
  </Wrapper>
);

export default SettingsSection;

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import SVGIcon from 'components/common/svg-icon/SVGIcon';
import metrics from 'styles/metrics';

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
    <SVGIcon
      id="chevron-right"
      size={metrics.getWidthFromDP('8%')}
    />
  </Wrapper>
);

export default SettingsSection;

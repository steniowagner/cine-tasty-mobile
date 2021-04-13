import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as TRANSLATIONS from '@i18n/tags';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

export const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

export const SectionTextContentWrapper = styled(View)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const SectionTitle = styled(Text)`
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

const ViewAllWrapper = styled(TouchableOpacity)`
  padding-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.width}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ViewAllText = styled(Text)`
  margin-left: 12px;
  margin-right: -4px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: #262626;
`;

type Props = {
  onPressViewAll: () => void;
  withViewAll?: boolean;
  sectionTitle: string;
  id: string;
};

const SectionViewAll = ({
  onPressViewAll,
  sectionTitle,
  withViewAll = true,
  id,
}: Props) => {
  const { t } = useTranslation();

  return (
    <SectionTextContentWrapper>
      <SectionTitle
        testID="section-title"
      >
        {sectionTitle}
      </SectionTitle>
      {withViewAll && (
        <ViewAllWrapper
          testID={`view-all-button-${id}`}
          onPress={onPressViewAll}
        >
          <ViewAllText>{t(TRANSLATIONS.HOME_VIEW_ALL)}</ViewAllText>
          <SVGIcon
            size={metrics.getWidthFromDP('7%')}
            colorThemeRef="buttonText"
            id="chevron-right"
          />
        </ViewAllWrapper>
      )}
    </SectionTextContentWrapper>
  );
};

export default SectionViewAll;

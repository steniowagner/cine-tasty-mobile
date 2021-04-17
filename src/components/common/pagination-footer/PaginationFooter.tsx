import React from 'react';
import { ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';

import metrics from '@styles/metrics';

import * as Styles from './PaginationFooter.styles';
import SVGIcon from '../svg-icon/SVGIcon';

const LoadButton = styled(TouchableOpacity).attrs(({ theme }) => ({
  hitSlop: {
    top: theme.metrics.largeSize,
    bottom: theme.metrics.largeSize,
    left: theme.metrics.largeSize,
    right: theme.metrics.largeSize,
  },
}))``;

const CustomActivityIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
}))``;

type Props = {
  onPressReloadButton?: () => void;
  isPaginating: boolean;
  hasError: boolean;
};

const PaginationFooter = ({ onPressReloadButton, isPaginating, hasError }: Props) => (
  <Styles.Wrapper
    testID="pagination-footer-wrapper"
  >
    {isPaginating && (
      <CustomActivityIndicator
        testID="loading-footer-wrapper"
        size={Platform.select({
          android: 'large',
          ios: 'small',
        })}
      />
    )}
    {hasError && (
      <LoadButton
        testID="pagination-footer-reload-button"
        onPress={onPressReloadButton}
      >
        <SVGIcon
          size={metrics.getWidthFromDP('10%')}
          id="restart"
        />
      </LoadButton>
    )}
  </Styles.Wrapper>
);

export default PaginationFooter;

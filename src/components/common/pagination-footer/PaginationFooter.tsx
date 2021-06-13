import React from 'react';
import { Platform } from 'react-native';

import metrics from '@styles/metrics';

import * as Styles from './PaginationFooter.styles';
import SVGIcon from '../svg-icon/SVGIcon';

type PaginationFooterProps = {
  onPressReloadButton?: () => void;
  isPaginating: boolean;
  hasError: boolean;
};

const PaginationFooter = ({
  onPressReloadButton,
  isPaginating,
  hasError,
}: PaginationFooterProps) => (
  <Styles.Wrapper
    testID="pagination-footer-wrapper"
  >
    {isPaginating && (
      <Styles.CustomActivityIndicator
        testID="loading-footer-wrapper"
        size={Platform.select({
          android: 'large',
          ios: 'small',
        })}
      />
    )}
    {hasError && (
      <Styles.LoadButton
        testID="pagination-footer-reload-button"
        onPress={onPressReloadButton}
      >
        <SVGIcon
          size={metrics.getWidthFromDP('10%')}
          id="restart"
        />
      </Styles.LoadButton>
    )}
  </Styles.Wrapper>
);

export default PaginationFooter;

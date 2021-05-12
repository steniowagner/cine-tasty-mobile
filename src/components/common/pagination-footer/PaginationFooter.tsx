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

const PaginationFooter = (props: PaginationFooterProps) => (
  <Styles.Wrapper
    testID="pagination-footer-wrapper"
  >
    {props.isPaginating && (
      <Styles.CustomActivityIndicator
        testID="loading-footer-wrapper"
        size={Platform.select({
          android: 'large',
          ios: 'small',
        })}
      />
    )}
    {props.hasError && (
      <Styles.LoadButton
        testID="pagination-footer-reload-button"
        onPress={props.onPressReloadButton}
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

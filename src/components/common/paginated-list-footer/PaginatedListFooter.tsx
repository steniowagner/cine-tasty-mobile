import React from 'react';
import { Platform } from 'react-native';

import metrics from '@styles/metrics';

import * as Styles from './PaginatedListFooter.styles';
import { SVGIcon } from '../svg-icon/SVGIcon';

type PaginatedListFooterProps = {
  onPressReloadButton: () => void;
  isPaginating: boolean;
  hasError: boolean;
};

export const PaginatedListFooter = (props: PaginatedListFooterProps) => (
  <Styles.Wrapper testID="pagination-footer-wrapper">
    {props.isPaginating && (
      <Styles.CustomActivityIndicator
        testID="pagination-loading-footer-wrapper"
        size={Platform.select({
          android: 'large',
          ios: 'small',
        })}
      />
    )}
    {props.hasError && (
      <Styles.LoadButton
        testID="pagination-footer-reload-button"
        onPress={props.onPressReloadButton}>
        <SVGIcon size={metrics.getWidthFromDP('10%')} id="restart" />
      </Styles.LoadButton>
    )}
  </Styles.Wrapper>
);

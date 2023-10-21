import React from 'react';

import metrics from '@/styles/metrics';

import * as Styles from './PaginatedListHeader.styles';
import { SVGIcon } from '../svg-icon/SVGIcon';

type PaginatedListHeaderProps = {
  onPress: () => void;
};

export const PaginatedListHeader = (props: PaginatedListHeaderProps) => (
  <Styles.ReloadButton testID="top-reload-button" onPress={props.onPress}>
    <SVGIcon size={metrics.getWidthFromDP('10')} id="restart" />
  </Styles.ReloadButton>
);

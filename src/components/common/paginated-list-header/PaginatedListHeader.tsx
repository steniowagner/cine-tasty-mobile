import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import * as Styles from './PagiantedListHeader.styles';

type PaginatedListHeaderProps = {
  onPress: () => void;
};

const PaginatedListHeader = ({ onPress }: PaginatedListHeaderProps) => (
  <Styles.ReloadButton
    testID="top-reload-button"
    onPress={onPress}
  >
    <SVGIcon
      size={metrics.getWidthFromDP('10%')}
      id="restart"
    />
  </Styles.ReloadButton>
);

export default PaginatedListHeader;

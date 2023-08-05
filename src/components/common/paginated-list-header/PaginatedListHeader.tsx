import React from 'react';

import * as Styles from './PagiantedListHeader.styles';

type PaginatedListHeaderProps = {
  onPress: () => void;
};

export const PaginatedListHeader = (props: PaginatedListHeaderProps) => (
  <Styles.ReloadButton testID="top-reload-button" onPress={props.onPress}>
    <Styles.Icon id="restart" />
  </Styles.ReloadButton>
);

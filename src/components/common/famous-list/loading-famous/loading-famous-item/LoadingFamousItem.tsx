import React from 'react';

import {useFamousListItemMeasures, LoadingPlaceholder} from '@components';
import Styles from './LoadingFamousItem.styles';

type LoadingFamousItemProps = {
  index: number;
};

const LoadingFamousItem = (props: LoadingFamousItemProps) => {
  const famousListItemMeasures = useFamousListItemMeasures(props);
  return (
    <LoadingPlaceholder
      style={{
        ...famousListItemMeasures.measures,
        ...Styles.placeholder,
      }}
      indexToDelayAnimation={props.index}
    />
  );
};

export default LoadingFamousItem;

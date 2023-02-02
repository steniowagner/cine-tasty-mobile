import React from 'react';

import {LoadingPlaceholder} from '@components';

import {getFamousListItemMeasures} from '../../get-famous-list-item-measures/getFamousListItemMeasures';
import Styles from './LoadingFamousItem.styles';

type LoadingFamousItemProps = {
  index: number;
};

export const LoadingFamousItem = (props: LoadingFamousItemProps) => {
  const famousListItemMeasures = getFamousListItemMeasures(props.index);

  return (
    <LoadingPlaceholder
      style={{
        ...famousListItemMeasures,
        ...Styles.placeholder,
      }}
      indexToDelayAnimation={props.index}
    />
  );
};

import React, {useLayoutEffect} from 'react';

import {HeaderIconButton, FamousList} from '@components/common';

import {FamousStackProps} from '../routes/route-params-types';
import useFamous from './useFamous';

const Famous = (props: FamousStackProps) => {
  const famous = useFamous({navigation: props.navigation});

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={famous.onPressHeaderIconButton}
          iconName="magnify"
          withMarginRight
        />
      ),
    });
  }, [famous.onPressHeaderIconButton]);

  return (
    <FamousList
      onPressBottomReloadButton={famous.onPressFooterReloadButton}
      onPressTopReloadButton={famous.onPressTopReloadButton}
      hasPaginationError={famous.hasPaginationError}
      onEndReached={famous.onEndReached}
      isPaginating={famous.isPaginating}
      isLoading={famous.isLoading}
      famous={famous.dataset}
      error={famous.error}
    />
  );
};

export default Famous;

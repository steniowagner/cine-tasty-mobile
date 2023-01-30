import React, {useEffect} from 'react';

import {HeaderIconButton, FamousList, Advise} from '@components';

import {FamousStackProps} from '../routes/route-params-types';
import useFamous from './useFamous';

export const Famous = (props: FamousStackProps) => {
  const famous = useFamous({navigation: props.navigation});

  useEffect(() => {
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

  if (famous.isFamousListEmpty) {
    return (
      <Advise
        description={famous.texts.advice.description}
        suggestion={famous.texts.advice.suggestion}
        title={famous.texts.advice.title}
        icon="alert-box"
      />
    );
  }

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

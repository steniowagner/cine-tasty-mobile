import React from 'react';

import {Advise} from '@components';

import {useMediaDetailsError} from './useMediaDetailsError';
import * as Styles from './MediaDetails.styles';

export const MediaDetailsError = () => {
  const mediadetailsError = useMediaDetailsError();
  return (
    <>
      <Styles.StatusBarStyled animated />
      <Advise
        description={mediadetailsError.texts.description}
        suggestion={mediadetailsError.texts.suggestion}
        title={mediadetailsError.texts.title}
        icon="alert-box"
      />
    </>
  );
};

import React from 'react';

import {StatusBarStyled, Advise} from '@components';

import {useMediaDetailsError} from './useMediaDetailsError';

export const MediaDetailsError = () => {
  const mediadetailsError = useMediaDetailsError();
  return (
    <>
      <StatusBarStyled />
      <Advise
        description={mediadetailsError.texts.description}
        suggestion={mediadetailsError.texts.suggestion}
        title={mediadetailsError.texts.title}
        icon="alert-box"
      />
    </>
  );
};

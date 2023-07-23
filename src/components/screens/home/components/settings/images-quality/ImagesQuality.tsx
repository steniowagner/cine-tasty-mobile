import React from 'react';

import {OptionSettings} from '../option-settings/OptionSetting';
import {useImagesQuality} from './useImagesQuality';

export const ImagesQuality = () => {
  const imagesQuality = useImagesQuality();
  return (
    <>
      {imagesQuality.qualities.map(({quality, title}) => (
        <OptionSettings
          isSelected={imagesQuality.qualitySelected === quality}
          onPress={() => imagesQuality.onPress(quality)}
          title={title}
          key={quality}
        />
      ))}
    </>
  );
};

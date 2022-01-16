import React from 'react';

import OptionSettings from '../option-settings/OptionSetting';
import useImagesQuality from './useImagesQuality';

const ImagesQuality = () => {
  const { qualitySelected, onPress, qualities } = useImagesQuality();

  return (
    <>
      {qualities.map(({ quality, title }) => (
        <OptionSettings
          isSelected={qualitySelected === quality}
          onPress={() => onPress(quality)}
          title={title}
          key={quality}
        />
      ))}
    </>
  );
};

export default ImagesQuality;

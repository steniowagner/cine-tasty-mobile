import React from 'react';

import useImagesQuality from './useImagesQuality';
import OptionSettings from '../OptionSetting';

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

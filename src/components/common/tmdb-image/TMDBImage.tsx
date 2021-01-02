import React from 'react';
import { View } from 'react-native';

import { useTMDBImageQuality } from 'providers/tmdb-image-quality/TMDBImageQuality';

const TMDBImage = () => {
  const asd = useTMDBImageQuality();
  console.log('asd: ', asd);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f',
      }}
    />
  );
};

export default TMDBImage;

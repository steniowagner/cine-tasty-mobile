import React from 'react';
import { View } from 'react-native';

import useMediaDetailScreen from './useMediaDetailScreen';

const MediaDetailScreen = (x) => {
  console.log(x.route.params);
  useMediaDetailScreen();

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

export default MediaDetailScreen;

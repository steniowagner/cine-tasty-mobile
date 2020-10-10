import React from 'react';
import { View } from 'react-native';

// import HeaderInfo from './header-info/HeaderInfo';
import useMediaDetailScreen from './useMediaDetailScreen';
// import GeneralInfo from './sections/GeneralInfo';
import PersonListItem from './PersonListItem';
// import Videos from './sections/Videos';

const MediaDetailScreen = (x) => {
  console.log(x.route.params);
  useMediaDetailScreen();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <PersonListItem
        onPress={() => {}}
        subText="The Emperor"
        image="https://image.tmdb.org/t/p/w780/5a6u17dAf11kLvdRUG6QdoRRURj.jpg"
        name="Jet Li"
      />
    </View>
  );
};

export default MediaDetailScreen;

/**
 * <HeaderInfo
        thumbnailURL="https://image.tmdb.org/t/p/w92/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg"
        voteCount={123}
        posterURL="/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg"
        imageURL="https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg"
        votesAverage={8.3}
        title="Vingadores: Guerra Infinita"
      />

       <GeneralInfo
        infoItems={[
          {
            title: 'Original Language',
            value: 'Celebrate',
          },
          {
            title: 'Budget',
            value: '-',
          },
        ]}
      />
 */

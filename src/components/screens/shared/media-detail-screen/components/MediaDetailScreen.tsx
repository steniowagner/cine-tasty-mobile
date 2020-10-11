import React from 'react';
import { View } from 'react-native';

// import HeaderInfo from './header-info/HeaderInfo';
import useMediaDetailScreen from './useMediaDetailScreen';
import ProductionCompanies from './sections/ProductionCompanies';
// import GeneralInfo from './sections/GeneralInfo';
// import PersonList from './person-list/PersonList';
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
      <ProductionCompanies
        productionCompanies={[
          {
            id: '2',
            logoPath: '/wdrCwmRnLFJhEoH8GSfymY85KHT.png',
            name: 'Walt Disney Pictures',
            originCountry: 'US',
          },
          {
            id: '14714',
            logoPath: '/oQHaOZEnPzlJACVTisV0FICrS82.png',
            name: 'China Film Group Corporation',
            originCountry: 'CN',
          },
          {
            id: '103698',
            logoPath: '/qS01bSMe274ecTdrgyO3BBvzfKK.png',
            name: 'Good Fear',
            originCountry: 'US',
          },
          {
            id: '89254',
            logoPath: null,
            name: 'Jason T. Reed Productions',
            originCountry: 'US',
          },
        ]}
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

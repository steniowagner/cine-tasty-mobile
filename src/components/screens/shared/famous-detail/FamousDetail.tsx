import React from 'react';
import { View } from 'react-native';

// import HeaderInfo from './header/HeaderInfo';
// import HeaderLoadingPlaceholder from './header/HeaderLoadingPlaceholder';
// import DeathDay from './header/death-day/DeathDay';
export const SCREEN_ID = 'FAMOUS_DETAIL';

/* const FamousDetail = () => (
  <HeaderInfo
      placeOfBirth="New York City, New York, USA"
      profileImage="/kuqFzlYMc2IrsOyPznMd1FroeGq.jpg"
      knownForDepartment="Actor"
      birthDate="1994-02-21"
      name="Dwayne Johnson"
    />
    <DeathDay deathDate="2020-02-28" />
); */

const FamousDetail = () => (
  <View
    style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  />
);

export default FamousDetail;

import React from 'react';

import NavigationButton from './navigation-button/NavigationButton';
import NavigationDots from './navigation-dots/NavigationDots';

import * as Styles from './BottomNavigation.styles';

type BottomNavigationProps = {
  indexSelected: number;
  onPress: () => void;
  buttonTitle: string;
};

const BottomNavigation = ({
  indexSelected,
  buttonTitle,
  onPress,
}: BottomNavigationProps) => (
  <Styles.Wrapper>
    <NavigationDots
      indexSelected={indexSelected}
    />
    <NavigationButton
      buttonTitle={buttonTitle}
      onPress={onPress}
    />
  </Styles.Wrapper>
);

export default BottomNavigation;

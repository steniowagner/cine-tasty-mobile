import React from 'react';

import useNavigationDots from './useNavigationDots';
import * as Styles from './NavigationDots.styles';

type NavigationProps = {
  indexSelected: number;
};

const Navigation = ({ indexSelected }: NavigationProps) => {
  const {
    firstDotWidth,
    secondDotWidth,
    thirdDotWidth,
    fourthDotWidth,
  } = useNavigationDots({
    indexSelected,
  });

  return (
    <Styles.Wrapper>
      <Styles.Dot
        style={{ width: firstDotWidth }}
      />
      <Styles.Dot
        style={{ width: secondDotWidth }}
      />
      <Styles.Dot
        style={{ width: thirdDotWidth }}
      />
      <Styles.Dot
        style={{ width: fourthDotWidth }}
      />
    </Styles.Wrapper>
  );
};

export default Navigation;
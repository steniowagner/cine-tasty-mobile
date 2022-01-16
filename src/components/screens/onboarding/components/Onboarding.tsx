import React from 'react';
import { StatusBar, FlatList } from 'react-native';
import { withTheme, DefaultTheme } from 'styled-components';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import metrics from '@styles/metrics';

import { OnboardingStackProps } from '../routes/route-params-types';
import BottomNavigation from './bottom-navigation/BottomNavigation';
import * as Styles from './Onboarding.styles';
import useOnboarding from './useOnboarding';

type OnboardingProps = {
  theme: DefaultTheme;
} & OnboardingStackProps;

const Onboarding = ({ route, theme }: OnboardingProps) => {
  const {
    onMomentumScrollEnd, indexSelected, flatlistRef, items,
  } = useOnboarding({
    route,
  });

  return (
    <Styles.Wrapper>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
        animated
      />
      <FlatList
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        testID="onboarding-list"
        ref={flatlistRef}
        bounces={false}
        pagingEnabled
        horizontal
        getItemLayout={(_, index) => ({
          offset: metrics.width * index,
          length: metrics.width,
          index,
        })}
        renderItem={({ item }) => (
          <Styles.ItemWrapper>
            <Styles.IconSection>
              <SVGIcon
                size={metrics.getWidthFromDP('40%')}
                colorThemeRef="buttonText"
                id={item.icon}
              />
            </Styles.IconSection>
            <Styles.TextSection>
              <Styles.LargeText>{item.title}</Styles.LargeText>
              <Styles.SmallText>{item.description}</Styles.SmallText>
            </Styles.TextSection>
          </Styles.ItemWrapper>
        )}
        keyExtractor={(item) => item.title}
        data={items}
      />
      <BottomNavigation
        buttonTitle={items[indexSelected].buttonTitle}
        onPress={items[indexSelected].onPress}
        indexSelected={indexSelected}
      />
    </Styles.Wrapper>
  );
};

export default withTheme(Onboarding);

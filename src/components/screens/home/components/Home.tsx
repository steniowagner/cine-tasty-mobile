/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import metrics from 'styles/metrics';

import { HomeStackParams } from '../routes/route-params-types';
import LoadingHome from './top3/LoadingTop3';
import useHome from './use-home/useHome';
import Header from './header/Header';
import Section from './Section';
import Top3 from './top3/Top3';

const PopupAdviceWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${Platform.select({
    android: metrics.getWidthFromDP('18%'),
    ios: metrics.getWidthFromDP('26%'),
  })}px;
`;

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const {
    shouldDisableHeaderActions,
    onPressTop3LearnMore,
    onPressTrendingItem,
    onSelectTVShows,
    onSelectMovies,
    onPressViewAll,
    onPressSearch,
    errorMessage,
    isLoading,
    trendings,
    top3,
  } = useHome(navigation);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          shouldDisableActions={shouldDisableHeaderActions}
          onPresSwitchTVShows={onSelectTVShows}
          onPressSwitchMovies={onSelectMovies}
          onPressSearch={onPressSearch}
          onPressSettings={() => {}}
        />
      ),
    });
  }, [shouldDisableHeaderActions, onPressSearch, isLoading]);

  if (isLoading) {
    return <LoadingHome />;
  }

  return (
    <>
      {!errorMessage && (
        <ScrollView
          testID="scrollview-content"
        >
          <Top3
            onPressLearnMore={onPressTop3LearnMore}
            top3Items={top3}
          />
          {trendings.map((trending) => (
            <Section
              onPressViewAll={() => onPressViewAll(trending.data, trending.sectionTitle)}
              onPressItem={(id: number) => onPressTrendingItem(id)}
              sectionTitle={trending.sectionTitle}
              key={trending.sectionTitle}
              items={trending.data}
            />
          ))}
        </ScrollView>
      )}
      {!!errorMessage && (
        <PopupAdviceWrapper>
          <PopupAdvice
            text={errorMessage}
          />
        </PopupAdviceWrapper>
      )}
    </>
  );
};

export default Home;

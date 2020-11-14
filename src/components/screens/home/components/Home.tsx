/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import PopupAdvice from 'components/common/popup-advice/PopupAdvice';
import { SimplifiedMedia } from 'types';
import metrics from 'styles/metrics';

import { HomeStackParams } from '../routes/route-params-types';
import LoadingHome from './top3/LoadingTop3';
import HomeSection from './HomeSection';
import useHome from './hooks/useHome';
import Header from './header/Header';
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
          onPressSettings={() => navigation.navigate('SETTINGS')}
          shouldDisableActions={shouldDisableHeaderActions}
          onPresSwitchTVShows={onSelectTVShows}
          onPressSwitchMovies={onSelectMovies}
          onPressSearch={onPressSearch}
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
            <HomeSection
              onPressItem={(mediaItem: SimplifiedMedia) => onPressTrendingItem(mediaItem)}
              onPressViewAll={() => onPressViewAll({
                viewAllTitle: trending.viewAllTitle,
                sectionItems: trending.data,
                sectionID: trending.id,
              })}
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

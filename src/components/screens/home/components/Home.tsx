/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
import * as Types from '@local-types';

import { HomeStackParams } from '../routes/route-params-types';
import HomeSection from './home-section/HomeSection';
import LoadingHome from './top3/LoadingTop3';
import * as Styles from './Home.styles';
import useHome from './hooks/useHome';
import Header from './header/Header';
import Top3 from './top3/Top3';

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
              onPressItem={(mediaItem: Types.SimplifiedMedia) => onPressTrendingItem(mediaItem)}
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
        <Styles.PopupAdviceWrapper>
          <PopupAdvice
            text={errorMessage}
          />
        </Styles.PopupAdviceWrapper>
      )}
    </>
  );
};

export default Home;

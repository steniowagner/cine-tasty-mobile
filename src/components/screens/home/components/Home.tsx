/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';

import PaginatedListHeader from '@components/common/paginated-list-header/PaginatedListHeader';
import PopupAdvice from '@components/common/popup-advice/PopupAdvice';
import { Routes } from '@routes/routes';
import * as Types from '@local-types';

import { HomeStackProps } from '../routes/route-params-types';
import LoadingHome from './top3/loading-top3/LoadingTop3';
import HomeSection from './home-section/HomeSection';
import * as Styles from './Home.styles';
import useHome from './hooks/useHome';
import Header from './header/Header';
import Top3 from './top3/Top3';

const Home = (props: HomeStackProps) => {
  const home = useHome({ navigation: props.navigation });

  useLayoutEffect(() => {
    const shouldShowReload = !!home.errorMessage && !home.isLoading;

    props.navigation.setOptions({
      header: () => (
        <>
          <Header
            onPressSettings={() => props.navigation.navigate(Routes.Settings.SETTINGS)}
            shouldDisableActions={home.shouldDisableHeaderActions}
            onPresSwitchTVShows={home.onSelectTVShows}
            onPressSwitchMovies={home.onSelectMovies}
            onPressSearch={home.onPressSearch}
          />
          {shouldShowReload && (
          <PaginatedListHeader
            onPress={home.onPressReload}
          />
          )}
        </>
      ),
    });
  }, [
    home.shouldDisableHeaderActions,
    home.onPressSearch,
    home.isLoading,
    home.errorMessage,
  ]);

  if (home.isLoading) {
    return <LoadingHome />;
  }

  if (home.errorMessage) {
    return (
      <>
        <Styles.PopupAdviceWrapper>
          <PopupAdvice
            text={home.errorMessage}
          />
        </Styles.PopupAdviceWrapper>
      </>
    );
  }

  return (
    <ScrollView
      testID="scrollview-content"
    >
      <Top3
        onPressLearnMore={home.onPressTop3LearnMore}
        top3Items={home.top3}
      />
      {home.trendings.map((trending) => (
        <HomeSection
          onPressItem={(mediaItem: Types.SimplifiedMedia) => home.onPressTrendingItem(mediaItem)}
          onPressViewAll={() => home.onPressViewAll({
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
  );
};

export default Home;

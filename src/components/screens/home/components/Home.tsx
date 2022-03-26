/* eslint-disable react/display-name */
import React, {useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';

import {PaginatedListHeader, PopupAdvice} from '@components';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {HomeStackProps} from '../routes/route-params-types';
import LoadingHome from './top3/loading-top3/LoadingTop3';
import HomeSection from './home-section/HomeSection';
import * as Styles from './Home.styles';
import useHome from './hooks/useHome';
import Header from './header/Header';
import Top3 from './top3/Top3';

export const Home = ({navigation}: HomeStackProps) => {
  const {
    shouldDisableHeaderActions,
    onPressTop3LearnMore,
    onPressTrendingItem,
    onSelectTVShows,
    onSelectMovies,
    onPressViewAll,
    onPressReload,
    onPressSearch,
    errorMessage,
    isLoading,
    trendings,
    top3,
  } = useHome({navigation});

  useLayoutEffect(() => {
    const shouldShowReload = !!errorMessage && !isLoading;

    navigation.setOptions({
      header: () => (
        <>
          <Header
            onPressSettings={() =>
              navigation.navigate(Routes.Settings.SETTINGS)
            }
            shouldDisableActions={shouldDisableHeaderActions}
            onPresSwitchTVShows={onSelectTVShows}
            onPressSwitchMovies={onSelectMovies}
            onPressSearch={onPressSearch}
          />
          {shouldShowReload && <PaginatedListHeader onPress={onPressReload} />}
        </>
      ),
    });
  }, [shouldDisableHeaderActions, onPressSearch, isLoading, errorMessage]);

  if (isLoading) {
    return <LoadingHome />;
  }

  if (errorMessage) {
    return (
      <>
        <Styles.PopupAdviceWrapper>
          <PopupAdvice text={errorMessage} />
        </Styles.PopupAdviceWrapper>
      </>
    );
  }

  return (
    <ScrollView testID="scrollview-content">
      <Top3 onPressLearnMore={onPressTop3LearnMore} top3Items={top3} />
      {trendings.map(trending => (
        <HomeSection
          onPressItem={(mediaItem: Types.SimplifiedMedia) =>
            onPressTrendingItem(mediaItem)
          }
          onPressViewAll={() =>
            onPressViewAll({
              viewAllTitle: trending.viewAllTitle,
              sectionItems: trending.data,
              sectionID: trending.id,
            })
          }
          sectionTitle={trending.sectionTitle}
          key={trending.sectionTitle}
          items={trending.data}
        />
      ))}
    </ScrollView>
  );
};

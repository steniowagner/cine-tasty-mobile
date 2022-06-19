import React, {useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';

import {PaginatedListHeader} from '@components';
import * as Types from '@local-types';

import {HomeStackProps} from '../routes/route-params-types';
import LoadingHome from './top3/loading-top3/LoadingTop3';
import HomeSection from './home-section/HomeSection';
import {useHome} from './useHome';
import {Header} from './header/Header';
import {Top3} from './top3/Top3';

export const Home = ({navigation}: HomeStackProps) => {
  const home = useHome({navigation});

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <>
          <Header
            onPressSettings={home.onPressSettings}
            onPresSwitchTVShows={home.onSelectTVShows}
            onPressSwitchMovies={home.onSelectMovies}
            shouldDisableActions={home.isLoading}
            onPressSearch={home.onPressSearch}
          />
          {home.shouldShowReload && (
            <PaginatedListHeader onPress={home.onPressReload} />
          )}
        </>
      ),
    });
  }, [home.shouldShowReload, home.onPressSearch, home.isLoading]);

  if (home.isLoading) {
    return <LoadingHome />;
  }

  return (
    <ScrollView testID="scrollview-content">
      <Top3 items={home.top3} />
      {home.trendings.map(trending => (
        <HomeSection
          onPressItem={(mediaItem: Types.SimplifiedMedia) =>
            trending.onPressItem(mediaItem)
          }
          onPressViewAll={trending.onPressViewAll}
          sectionTitle={trending.sectionTitle}
          key={trending.sectionTitle}
          items={trending.data}
        />
      ))}
    </ScrollView>
  );
};

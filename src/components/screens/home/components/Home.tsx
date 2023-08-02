import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';

import {SettingsModal} from './settings/settings-modal/SettingsModal';
import {PaginatedListHeader} from '@components';
import * as Types from '@local-types';

import {HomeStackProps} from '../routes/route-params-types';
import {LoadingHome} from './loading/LoadingHome';
import {HomeSection} from './home-section/HomeSection';
import {Header} from './header/Header';
import {useHome} from './useHome';
import {Top3} from './top3/Top3';
import * as Styles from './Home.styles';

export const Home = (props: HomeStackProps) => {
  const home = useHome({navigation: props.navigation});

  useEffect(() => {
    props.navigation.setOptions({
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
    <>
      <SettingsModal
        setIsSettingsModalOpen={home.setIsSettingsModalOpen}
        isSettingsModalOpen={home.isSettingsModalOpen}
        navigation={props.navigation}
      />
      <ScrollView
        testID="scrollview-content"
        contentContainerStyle={Styles.sheet.wrapper}>
        <Top3 items={home.top3} />
        {home.trendings.map(trending => (
          <HomeSection
            onPressItem={(mediaItem: Types.SimplifiedMedia) =>
              trending.onPressItem(mediaItem)
            }
            onPressViewAll={trending.onPressViewAll}
            sectionTitle={trending.sectionTitle}
            key={trending.sectionTitle}
            id={`${home.isMoviesSelected ? 'MOVIES' : 'TV_SHOWS'}-${
              trending.sectionTitle
            }`}
            items={trending.data}
          />
        ))}
      </ScrollView>
    </>
  );
};

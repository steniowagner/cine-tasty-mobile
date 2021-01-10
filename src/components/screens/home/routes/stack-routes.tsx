import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DefaultTheme, withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import TVShowSeasonDetail, {
  Props as TVShowSeasonDetailExternalProps,
} from 'components/screens/shared/tv-show-seasons-screen/routes/stack-routes';
import TVShowDetail from 'components/screens/shared/media-detail-screen/tv-show-detail/components/TVShowDetail';
import MoviedDetail from 'components/screens/shared/media-detail-screen/movie-detail/components/MovieDetail';
import FamousDetail from 'components/screens/shared/famous-detail/components/FamousDetail';
import Reviews, {
  Props as ReviewsExternalParams,
} from 'components/screens/shared/media-detail-screen/reviews/components/Reviews';
import { getTransparentHeaderOptions, getDefaultHeaderOptions } from 'routes/constants';

import ImagesQuality from '../components/settings/images-quality/ImagesQuality';
import OpenSource from '../components/settings/open-source/OpenSource';
import MediaSectionViewAll, {
  Props as MediaSectionViewAllScreenProps,
} from '../components/media-section-view-all/MediaSectionViewAll';
import Language from '../components/settings/languages/Languages';
import About from '../components/settings/about/About';
import Settings from '../components/settings/Settings';
import LOCAL_ROUTES from './route-names';
import Home from '../components/Home';

const Stack = createStackNavigator();

type Props = {
  theme: DefaultTheme;
};

const HomeStack = ({ theme }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      headerMode="screen"
    >
      <Stack.Screen
        options={{
          ...getTransparentHeaderOptions(theme),
          headerTransparent: true,
        }}
        name={LOCAL_ROUTES.HOME.id}
        component={Home}
      />
      <Stack.Screen
        options={{
          ...getTransparentHeaderOptions(theme),
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name={LOCAL_ROUTES.FAMOUS_DETAIL.id}
        component={FamousDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.MEDIA_DETAILS_VIEW_ALL.id}
        options={({ route }: MediaSectionViewAllScreenProps) => ({
          ...getDefaultHeaderOptions(),
          headerTitle: route.params.headerTitle,
        })}
        component={MediaSectionViewAll}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.MOVIE_DETAIL.id}
        options={() => ({
          ...getTransparentHeaderOptions(theme),
        })}
        component={MoviedDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.TV_SHOW_DETAIL.id}
        options={() => ({
          ...getTransparentHeaderOptions(theme),
        })}
        component={TVShowDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.REVIEWS.id}
        options={({ route }: ReviewsExternalParams) => ({
          ...getDefaultHeaderOptions(),
          headerTitle: route.params.mediaTitle,
        })}
        component={Reviews}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.TV_SHOW_SEASONS.id}
        options={({ route }: TVShowSeasonDetailExternalProps) => ({
          ...getDefaultHeaderOptions(),
          headerTintColor: theme.colors.buttonText,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: route.params.title,
        })}
        component={TVShowSeasonDetail}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.SETTINGS.id}
        component={Settings}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settings'),
        })}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.LANGUAGE.id}
        component={Language}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:language:headerTitle'),
        })}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.OPEN_SOURCE.id}
        component={OpenSource}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:openSource:headerTitle'),
        })}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.ABOUT.id}
        component={About}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:about:headerTitle'),
        })}
      />
      <Stack.Screen
        name={LOCAL_ROUTES.IMAGES_QUALITY.id}
        component={ImagesQuality}
        options={() => ({
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:home:settingsSections:imagesQuality:headerTitle'),
        })}
      />
    </Stack.Navigator>
  );
};

export const TabID = LOCAL_ROUTES.HOME.id;

export default withTheme(HomeStack);

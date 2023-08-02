import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useTheme} from 'styled-components/native';

import {ReviewsProps} from '@src/components/screens/common/reviews/routes/route-params-types';
import {ImagesGallery} from '@src/components/screens/common/images-gallery/components/images-gallery/ImagesGallery';
import {MovieDetail} from '@src/components/screens/common/media-details/movie-details/components/MovieDetails';
import {FamousDetails} from '@src/components/screens/common/famous-details/components/FamousDetails';
import {Reviews} from '@src/components/screens/common/reviews/components/Reviews';
import {
  getTransparentHeaderOptions,
  DEFAULT_HEADER_OPTIONS,
} from '@routes/constants';
import {Routes} from '@routes/routes';
import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';
import {HeaderIconButton} from '@components';

import {MediaSectionViewAll} from '../components/media-section-view-all/components/MediaSectionViewAll';
import {MediaSectionViewAllProps} from '../components/media-section-view-all/routes/route-params-types';
import {Home} from '../components/Home';
import {SeasonsProps} from '../../common/media-details/seasons/routes/route-params-types';
import {SeasonsDetailsTabs} from '../../common/media-details/seasons/components/tabs/SeasonsDetailsTabs';
import {ImagesQuality} from '../components/settings/images-quality/ImagesQuality';
import {Languages} from '../components/settings/languages/Languages';
import {ThemeSettings} from '../components/settings/theme-settings/ThemeSettings';
import {OpenSource} from '../components/settings/open-source/OpenSource';
import {About} from '../components/settings/about/About';
import {SearchMedia, TVShowDetail} from '../../common';

const StackNavigator = createStackNavigator();

export const HomeStack = () => {
  const theme = useTheme();
  const TRANSPARENT_HEADER_OPTIONS = getTransparentHeaderOptions(theme);
  const translations = useTranslations();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}>
      <StackNavigator.Screen
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
          headerTransparent: true,
        }}
        name={Routes.Home.HOME}
        component={Home}
      />
      <StackNavigator.Screen
        options={{
          ...TRANSPARENT_HEADER_OPTIONS,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        name={Routes.Home.FAMOUS_DETAILS}
        component={FamousDetails}
      />
      <StackNavigator.Screen
        name={Routes.Home.MEDIA_DETAILS_VIEW_ALL}
        options={(props: MediaSectionViewAllProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerLeft: () => (
            <HeaderIconButton
              withMarginLeft
              color="text"
              onPress={props.navigation.goBack}
              iconName="arrow-back"
            />
          ),
          headerTitle: props.route.params.headerTitle,
          headerTitleAlign: 'center',
        })}
        component={MediaSectionViewAll}
      />
      <StackNavigator.Screen
        name={Routes.Home.MOVIE_DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={MovieDetail}
      />
      <StackNavigator.Screen
        name={Routes.Home.TV_SHOW_DETAILS}
        options={() => ({
          ...TRANSPARENT_HEADER_OPTIONS,
        })}
        component={TVShowDetail}
      />
      <StackNavigator.Screen
        name={Routes.Home.TV_SHOW_SEASONS}
        options={(props: SeasonsProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerLeft: () => (
            <HeaderIconButton
              withMarginLeft
              color="buttonText"
              onPress={props.navigation.goBack}
              iconName="arrow-back"
            />
          ),
          headerTintColor: theme.colors.buttonText,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: props.route.params.title,
          headerTitleAlign: 'center',
        })}
        component={SeasonsDetailsTabs}
      />
      <StackNavigator.Screen
        name={Routes.Home.MEDIA_REVIEWS}
        options={(props: ReviewsProps) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerLeft: () => (
            <HeaderIconButton
              withMarginLeft
              color="text"
              onPress={props.navigation.goBack}
              iconName="arrow-back"
            />
          ),
          headerTitle: props.route.params.mediaTitle,
          headerTitleAlign: 'center',
        })}
        component={Reviews}
      />
      <StackNavigator.Screen
        name={Routes.Home.IMAGES_GALLERY}
        component={ImagesGallery}
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name={Routes.Home.SETTINGS_IMAGES_QUALITY}
        component={ImagesQuality}
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(
            Translations.Tags.SETTINGS_IMAGES_QUALITY,
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name={Routes.Home.SETTINGS_LANGUAGE}
        component={Languages}
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(
            Translations.Tags.SETTINGS_LANGUAGE,
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name={Routes.Home.SETTINGS_THEME}
        component={ThemeSettings}
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(Translations.Tags.SETTINGS_THEME),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name={Routes.Home.SETTINGS_OPEN_SOURCE}
        component={OpenSource}
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(
            Translations.Tags.SETTINGS_OPEN_SOURCE,
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name={Routes.Home.SETTINGS_ABOUT}
        component={About}
        options={({navigation}) => ({
          ...DEFAULT_HEADER_OPTIONS,
          headerTitle: translations.translate(Translations.Tags.SETTINGS_ABOUT),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderIconButton
              onPress={navigation.goBack}
              iconName="arrow-back"
              withMarginLeft
              color="text"
            />
          ),
        })}
      />
      <StackNavigator.Screen
        name={Routes.Home.SEARCH_MOVIE}
        options={{
          header: () => null,
        }}
        initialParams={{
          searchType: SchemaTypes.SearchType.MOVIE,
          queryId: 'search_movie' as Types.CineTastyQuery,
          searchByTextError: translations.translate(
            Translations.Tags.HOME_SEARCH_MOVIE_QUERY_BY_TEXT_ERROR,
          ),
          paginationError: translations.translate(
            Translations.Tags.HOME_SEARCH_MOVIE_PAGINATION_ERROR,
          ),
          placeholder: translations.translate(
            Translations.Tags.HOME_SEARCH_MOVIE_PLACEHOLDER,
          ),
        }}
        component={SearchMedia}
      />
      <StackNavigator.Screen
        name={Routes.Home.SEARCH_TV_SHOW}
        options={{
          header: () => null,
        }}
        initialParams={{
          searchType: SchemaTypes.SearchType.TV,
          queryId: 'search_tv' as Types.CineTastyQuery,
          searchByTextError: translations.translate(
            Translations.Tags.HOME_SEARCH_TV_SHOW_QUERY_BY_TEXT_ERROR,
          ),
          paginationError: translations.translate(
            Translations.Tags.HOME_SEARCH_TV_SHOW_PAGINATION_ERROR,
          ),
          placeholder: translations.translate(
            Translations.Tags.HOME_SEARCH_TV_SHOW_PLACEHOLDER,
          ),
        }}
        component={SearchMedia}
      />
    </StackNavigator.Navigator>
  );
};

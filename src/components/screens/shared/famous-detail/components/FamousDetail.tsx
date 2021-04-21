/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import React, { useLayoutEffect, useCallback, useRef } from 'react';
import { StatusBar, Animated, FlatList } from 'react-native';
import { withTheme } from 'styled-components';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ExpansibleTextSection from '@components/common/expansible-text-section/ExpansibleTextSection';
import ProgressiveImage from '@components/common/progressive-image/ProgressiveImage';
import ImagesList from '@components/common/images-list/ImagesList';
import { useGetCurrentTheme, useStatusBarStyle } from '@hooks';
import Section from '@components/common/section/Section';
import Advise from '@components/common/advise/Advise';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';
import metrics from '@styles/metrics';

import HeaderBackButton from '../../header-back-button/HeaderBackButton';
import { FamousDetailStackProps } from '../routes/route-params-types';
import HeaderInfo from './header/header-info/HeaderInfo';
import useFamousDetail from './useFamousDetail';
import * as Styles from './FamousDetail.styles';
import DeathDay from './death-day/DeathDay';

const FamousDetail = ({ navigation, theme, route }: FamousDetailStackProps) => {
  const { currentTheme } = useGetCurrentTheme({ theme });
  const { barStyle } = useStatusBarStyle({ theme });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  const {
    backgroundImage, isLoading, famous, hasError, t,
  } = useFamousDetail({
    id: route.params.id,
  });

  const scrollViewOffset = useRef(new Animated.Value(0)).current;

  const renderImagesSection = useCallback((images: string[]) => {
    const sectionImagesTitle = images.length > 0
      ? t(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)
      : `${t(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)} (0)`;

    return (
      <Styles.ImagesSectionWrapper>
        <Section
          title={sectionImagesTitle}
          noMarginTop
        >
          <ImagesList
            images={images}
          />
        </Section>
      </Styles.ImagesSectionWrapper>
    );
  }, []);

  const renderMovieCastSection = useCallback(
    (movieCast: SchemaTypes.GetFamousDetail_person_moviesCast[]) => {
      const sectionCastMoviesTitle = movieCast.length > 0
        ? t(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)
        : `${t(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)} (0)`;

      return (
        <Section
          title={sectionCastMoviesTitle}
        >
          <FlatList
            renderItem={({ item, index }) => (
              <SimplifiedMediaListItem
                onPress={() => navigation.push(Routes.Movie.DETAILS, {
                  voteAverage: item.voteAverage,
                  posterPath: item.posterPath,
                  voteCount: item.voteCount,
                  title: item.title,
                  id: item.id,
                })}
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                image={item.posterPath}
                isFirst={index === 0}
                title={item.title}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            testID="movies-cast"
            data={movieCast}
            horizontal
          />
        </Section>
      );
    },
    [],
  );

  const renderTVShowCastSection = useCallback(
    (tvShowCast: SchemaTypes.GetFamousDetail_person_tvCast[]) => {
      const sectionCastTVShowsTitle = tvShowCast.length > 0
        ? t(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)
        : `${t(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)} (0)`;

      return (
        <Section
          title={t(sectionCastTVShowsTitle)}
        >
          <FlatList
            renderItem={({ item, index }) => (
              <SimplifiedMediaListItem
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                isFirst={index === 0}
                onPress={() => navigation.push(Routes.TVShow.DETAILS, {
                  voteAverage: item.voteAverage,
                  posterPath: item.posterPath,
                  voteCount: item.voteCount,
                  title: item.name,
                  id: item.id,
                })}
                image={item.posterPath}
                title={item.name}
              />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            data={tvShowCast}
            testID="tv-cast"
            horizontal
          />
        </Section>
      );
    },
    [],
  );

  if (hasError) {
    return (
      <Advise
        description={t(TRANSLATIONS.FAMOUS_DETAIL_ERROR_DESCRIPTION)}
        suggestion={t(TRANSLATIONS.FAMOUS_DETAIL_ERROR_SUGGESTION)}
        title={t(TRANSLATIONS.FAMOUS_DETAIL_ERROR_TITLE)}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle={barStyle}
        animated
      />
      <Styles.BackgroundImageWrapper
        testID="background-image-wrapper"
      >
        <Animated.View
          style={{
            opacity: scrollViewOffset.interpolate({
              inputRange: [0, metrics.getHeightFromDP('10%')],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          <ProgressiveImage
            image={backgroundImage}
            imageType="backdrop"
          />
        </Animated.View>
        <Styles.SmokeShadow
          currentTheme={currentTheme}
        />
      </Styles.BackgroundImageWrapper>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollViewOffset },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        testID="scroll-content"
      >
        <HeaderInfo
          knownForDepartment={famous?.knownForDepartment}
          profileImage={route.params.profileImage}
          placeOfBirth={famous?.placeOfBirth}
          birthDate={famous?.birthday}
          name={route.params.name}
          isLoading={isLoading}
        />
        {!!famous?.deathday && (
        <DeathDay
          deathDate={famous.deathday}
        />
        )}
        <Styles.BiographySectionWrapper
          testID="biography-section"
        >
          <ExpansibleTextSection
            sectionTitle={t(TRANSLATIONS.FAMOUS_DETAIL_BIOGRAPGY)}
            text={famous?.biography}
            isLoading={isLoading}
          />
        </Styles.BiographySectionWrapper>
        {!!famous && (
          <>
            {!!famous.images && renderImagesSection(famous.images)}
            {!!famous.moviesCast && renderMovieCastSection(famous.moviesCast)}
            {!!famous.tvCast && renderTVShowCastSection(famous.tvCast)}
          </>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default withTheme(FamousDetail);

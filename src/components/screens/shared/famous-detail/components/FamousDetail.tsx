/* eslint-disable react/display-name */
import React, { useLayoutEffect, useCallback, useRef } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ExpansibleTextSection from 'components/common/expansible-text-section/ExpansibleTextSection';
import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import ImagesList from 'components/common/images-list/ImagesList';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';
import {
  GetFamousDetail_person_moviesCast as MovieCast,
  GetFamousDetail_person_tvCast as TVShowCast,
} from 'types/schema';
import metrics from 'styles/metrics';

import { FamousDetailParams } from '../routes/route-params-types';
import HeaderBackButton from '../../HeaderBackButton';
import useFamousDetail from './useFamousDetail';
import HeaderInfo from './header/HeaderInfo';
import DeathDay from './death-day/DeathDay';

export const CAST_MOVIES_SECTION_I18N_REF = 'translations:famousDetail:castMovies';
export const BIOGRAPHY_SECTION_I18N_REF = 'translations:famousDetail:biography';
export const TV_SHOWS_SECTION_I18N_REF = 'translations:famousDetail:castTV';
export const IMAGES_SECTION_I18N_REF = 'translations:famousDetail:images';

export const ERROR_DESCRIPTION_I18N_REF = 'translations:famousDetail:errorDescription';
export const ERROR_SUGGESTION_I18N_REF = 'translations:famousDetail:errorSuggestion';
export const ERROR_TITLE_I18N_REF = 'translations:famousDetail:errorTitle';

const BackgroundImageWrapper = styled(Animated.View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('100%')}px;
  position: absolute;
`;

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['transparent', theme.colors.background],
}))`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('100%')}px;
  position: absolute;
  bottom: 0;
`;

const BiographySectionWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('5%')}px;
`;

const ImagesSectionWrapper = styled(View)`
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

type QuestionsScreenNavigationProp = StackNavigationProp<
  FamousDetailParams,
  'FAMOUS_DETAIL'
>;

type QuestionsScreenRouteProp = RouteProp<FamousDetailParams, 'FAMOUS_DETAIL'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const FamousDetail = ({ navigation, route }: Props) => {
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
      ? t(IMAGES_SECTION_I18N_REF)
      : `${t(IMAGES_SECTION_I18N_REF)} (0)`;

    return (
      <ImagesSectionWrapper>
        <Section
          title={sectionImagesTitle}
          noMarginTop
        >
          <ImagesList
            images={images}
          />
        </Section>
      </ImagesSectionWrapper>
    );
  }, []);

  const renderMovieCastSection = useCallback((movieCast: MovieCast[]) => {
    const sectionCastMoviesTitle = movieCast.length > 0
      ? t(CAST_MOVIES_SECTION_I18N_REF)
      : `${t(CAST_MOVIES_SECTION_I18N_REF)} (0)`;

    return (
      <Section
        title={sectionCastMoviesTitle}
      >
        <FlatList
          renderItem={({ item, index }) => (
            <SimplifiedMediaListItem
              onPress={() => navigation.push('MOVIE_DETAIL', {
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
  }, []);

  const renderTVShowCastSection = useCallback((tvShowCast: TVShowCast[]) => {
    const sectionCastTVShowsTitle = tvShowCast.length > 0
      ? t(TV_SHOWS_SECTION_I18N_REF)
      : `${t(TV_SHOWS_SECTION_I18N_REF)} (0)`;

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
              onPress={() => navigation.push('TV_SHOW_DETAIL', {
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
  }, []);

  if (hasError) {
    return (
      <Advise
        description={t(ERROR_DESCRIPTION_I18N_REF)}
        suggestion={t(ERROR_SUGGESTION_I18N_REF)}
        title={t(ERROR_TITLE_I18N_REF)}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <BackgroundImageWrapper
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
            thumbnailURL={backgroundImage?.thumbnailURL}
            imageURL={backgroundImage?.imageURL}
          />
        </Animated.View>
        <SmokeShadow />
      </BackgroundImageWrapper>
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
        <BiographySectionWrapper
          testID="biography-section"
        >
          <ExpansibleTextSection
            sectionTitle={t(BIOGRAPHY_SECTION_I18N_REF)}
            text={famous?.biography}
            isLoading={isLoading}
          />
        </BiographySectionWrapper>
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

export default FamousDetail;

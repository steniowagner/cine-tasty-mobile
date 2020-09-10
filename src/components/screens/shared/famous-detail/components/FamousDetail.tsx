import React, { useRef } from 'react';
import {
  Animated, StatusBar, FlatList, View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import SimplifiedMediaListItem from 'components/common/simplified-media-list-item/SimplifiedMediaListItem';
import MediaItemDescription from 'components/common/media-item-description/MediaItemDescription';
import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import ImagesList from 'components/common/images-list/ImagesList';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';
import metrics from 'styles/metrics';

import { FamousDetailParams } from '../routes/route-params-types';
import FamousDetailLoading from './FamousDetailLoading';
import useFamousDetail from './useFamousDetail';
import HeaderInfo from './header/HeaderInfo';
import DeathDay from './death-day/DeathDay';

const SectionWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

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

type QuestionsScreenNavigationProp = StackNavigationProp<
  FamousDetailParams,
  'FAMOUS_DETAIL'
>;

type QuestionsScreenRouteProp = RouteProp<FamousDetailParams, 'FAMOUS_DETAIL'>;

type Props = {
  navigation: QuestionsScreenNavigationProp;
  route: QuestionsScreenRouteProp;
};

const FamousDetail = ({ route }: Props) => {
  const {
    backgroundImage, isLoading, famous, hasError, t,
  } = useFamousDetail({
    id: route.params.id,
  });

  const scrollViewOffset = useRef(new Animated.Value(0)).current;

  if (isLoading) {
    return (
      <>
        <StatusBar
          translucent
          animated
          backgroundColor="transparent"
        />
        <FamousDetailLoading />
      </>
    );
  }

  if (hasError) {
    return (
      <>
        <StatusBar
          translucent
          animated
          backgroundColor="transparent"
        />
        <Advise
          description={t('translations:famousDetail:errorDescription')}
          suggestion={t('translations:famousDetail:errorSuggestion')}
          title={t('translations:famousDetail:errorTitle')}
          icon="alert-box"
        />
      </>
    );
  }

  return (
    famous && (
      <>
        <StatusBar
          translucent
          animated
          backgroundColor="transparent"
        />
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
              thumbnailURL={backgroundImage.thumbnailURL}
              imageURL={backgroundImage.imageURL}
            />
          </Animated.View>
          <SmokeShadow />
        </BackgroundImageWrapper>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: scrollViewOffset },
              },
            },
          ])}
          testID="scroll-content"
        >
          <HeaderInfo
            placeOfBirth={famous.placeOfBirth}
            profileImage={famous.profilePath}
            knownForDepartment={famous.knownForDepartment}
            birthDate={famous.birthday}
            name={famous.name}
          />
          {!!famous.deathday && (
            <SectionWrapper>
              <DeathDay
                deathDate={famous.deathday}
              />
            </SectionWrapper>
          )}
          {famous.images && !!famous.images.length && (
            <Section
              title={t('translations:famousDetail:images')}
            >
              <ImagesList
                images={famous.images}
              />
            </Section>
          )}
          {famous.moviesCast && !!famous.moviesCast.length && (
            <Section
              title={t('translations:famousDetail:castMovies')}
              noMarginBottom
            >
              <FlatList
                renderItem={({ item, index }) => (
                  <SimplifiedMediaListItem
                    voteAverage={item.voteAverage}
                    voteCount={item.voteCount}
                    isFirst={index === 0}
                    onPress={() => {}}
                    image={item.posterPath}
                    title={item.title}
                  />
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsHorizontalScrollIndicator={false}
                data={famous.moviesCast}
                testID="movies-cast"
                horizontal
              />
            </Section>
          )}
          {famous.tvCast.length && !!famous.tvCast.length && (
            <Section
              title={t('translations:famousDetail:castTV')}
              noMarginBottom
            >
              <FlatList
                renderItem={({ item, index }) => (
                  <SimplifiedMediaListItem
                    voteAverage={item.voteAverage}
                    voteCount={item.voteCount}
                    isFirst={index === 0}
                    onPress={() => {}}
                    image={item.posterPath}
                    title={item.name}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                data={famous.tvCast}
                testID="tv-cast"
                horizontal
              />
            </Section>
          )}
          <Section
            withHorizontalPadding
            title={t('translations:famousDetail:biography')}
          >
            <MediaItemDescription
              description={famous.biography}
            />
          </Section>
        </Animated.ScrollView>
      </>
    )
  );
};

export default FamousDetail;

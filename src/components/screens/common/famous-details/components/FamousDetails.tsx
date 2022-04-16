import React, {useLayoutEffect} from 'react';
import {Animated} from 'react-native';
import {withTheme} from 'styled-components/native';

import {
  ExpansibleTextSection,
  MediaHorizontalList,
  ProgressiveImage,
  ImagesList,
  HeaderBackButton,
  Advise,
  StatusBarStyled,
} from '@components';
import {useGetCurrentTheme} from '@hooks';

import metrics from '@styles/metrics';

import {FamousDetailStackProps} from '../routes/route-params-types';
import HeaderInfo from './header/header-info/HeaderInfo';
import useFamousDetail from './useFamousDetails';
import * as Styles from './FamousDetails.styles';
import DeathDay from './death-day/DeathDay';

export const FamousDetails = withTheme((props: FamousDetailStackProps) => {
  const getCurrentTheme = useGetCurrentTheme({theme: props.theme});
  const famousDetail = useFamousDetail({
    id: props.route.params.id,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => props.navigation.goBack()} />
      ),
    });
  }, [props.navigation]);

  if (famousDetail.hasError) {
    return (
      <Advise
        description={famousDetail.texts.advise.description}
        suggestion={famousDetail.texts.advise.suggestion}
        title={famousDetail.texts.advise.title}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <StatusBarStyled />
      <Styles.BackgroundImageWrapper testID="background-image-wrapper">
        <Animated.View
          style={{
            opacity: famousDetail.scrollViewOffset.interpolate({
              inputRange: [0, metrics.getHeightFromDP('10%')],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}>
          <ProgressiveImage
            image={famousDetail.backgroundImage}
            imageType="backdrop"
          />
        </Animated.View>
        {/* @ts-ignore */}
        <Styles.SmokeShadow currentTheme={getCurrentTheme.currentTheme} />
      </Styles.BackgroundImageWrapper>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: famousDetail.scrollViewOffset},
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        testID="scroll-content">
        <HeaderInfo
          knownForDepartment={famousDetail.famous?.knownForDepartment}
          profileImage={props.route.params.profileImage}
          placeOfBirth={famousDetail.famous?.placeOfBirth}
          birthDate={famousDetail.famous?.birthday}
          isLoading={famousDetail.isLoading}
          name={props.route.params.name}
        />
        {!!famousDetail.famous?.deathday && (
          <DeathDay deathDate={famousDetail.famous.deathday} />
        )}
        <Styles.BiographySectionWrapper testID="biography-section">
          <ExpansibleTextSection
            sectionTitle={famousDetail.texts.biography}
            text={famousDetail.famous?.biography}
            isLoading={famousDetail.isLoading}
          />
        </Styles.BiographySectionWrapper>
        {!!famousDetail.famous && (
          <>
            {!!famousDetail.famous.images && (
              <ImagesList images={famousDetail.famous.images} />
            )}
            {!!famousDetail.famous.moviesCast && (
              <MediaHorizontalList
                title={famousDetail.texts.castMoviesSection}
                dataset={famousDetail.famous.moviesCast}
                type="MOVIE"
              />
            )}
            {!!famousDetail.famous.tvCast && (
              <MediaHorizontalList
                title={famousDetail.texts.castTvShowSection}
                dataset={famousDetail.famous.tvCast}
                type="TV_SHOW"
              />
            )}
          </>
        )}
      </Animated.ScrollView>
    </>
  );
});

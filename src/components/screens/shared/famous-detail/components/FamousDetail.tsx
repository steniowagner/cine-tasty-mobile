/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import React, { useLayoutEffect, useRef } from 'react';
import { StatusBar, Animated } from 'react-native';
import { withTheme } from 'styled-components';

import ExpansibleTextSection from '@components/common/expansible-text-section/ExpansibleTextSection';
import ProgressiveImage from '@components/common/progressive-image/ProgressiveImage';
import { useGetCurrentTheme, useStatusBarStyle } from '@hooks';
import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import useRenderFamousDetailSections from './useRenderFamousDetailSections';
import HeaderBackButton from '../../header-back-button/HeaderBackButton';
import { FamousDetailStackProps } from '../routes/route-params-types';
import HeaderInfo from './header/header-info/HeaderInfo';
import useFamousDetail from './useFamousDetail';
import * as Styles from './FamousDetail.styles';
import DeathDay from './death-day/DeathDay';

const FamousDetail = (props: FamousDetailStackProps) => {
  const renderFamousDetailSections = useRenderFamousDetailSections({
    navigation: props.navigation,
  });
  const getCurrentTheme = useGetCurrentTheme({ theme: props.theme });
  const statusBarStyle = useStatusBarStyle({ theme: props.theme });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => props.navigation.goBack()}
        />
      ),
    });
  }, []);

  const famousDetail = useFamousDetail({
    id: props.route.params.id,
  });

  const scrollViewOffset = useRef(new Animated.Value(0)).current;

  if (famousDetail.hasError) {
    return (
      <Advise
        description={famousDetail.t(TRANSLATIONS.FAMOUS_DETAIL_ERROR_DESCRIPTION)}
        suggestion={famousDetail.t(TRANSLATIONS.FAMOUS_DETAIL_ERROR_SUGGESTION)}
        title={famousDetail.t(TRANSLATIONS.FAMOUS_DETAIL_ERROR_TITLE)}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={props.theme.colors.secondary}
        barStyle={statusBarStyle.barStyle}
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
            image={famousDetail.backgroundImage}
            imageType="backdrop"
          />
        </Animated.View>
        <Styles.SmokeShadow
          currentTheme={getCurrentTheme.currentTheme}
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
          knownForDepartment={famousDetail.famous?.knownForDepartment}
          profileImage={props.route.params.profileImage}
          placeOfBirth={famousDetail.famous?.placeOfBirth}
          birthDate={famousDetail.famous?.birthday}
          name={props.route.params.name}
          isLoading={famousDetail.isLoading}
        />
        {!!famousDetail.famous?.deathday && (
          <DeathDay
            deathDate={famousDetail.famous.deathday}
          />
        )}
        <Styles.BiographySectionWrapper
          testID="biography-section"
        >
          <ExpansibleTextSection
            sectionTitle={famousDetail.t(TRANSLATIONS.FAMOUS_DETAIL_BIOGRAPGY)}
            text={famousDetail.famous?.biography}
            isLoading={famousDetail.isLoading}
          />
        </Styles.BiographySectionWrapper>
        {!!famousDetail.famous && (
          <>
            {!!famousDetail.famous.images
              && renderFamousDetailSections.renderImagesSection(famousDetail.famous.images)}
            {!!famousDetail.famous.moviesCast
              && renderFamousDetailSections.renderMovieCastSection(
                famousDetail.famous.moviesCast,
              )}
            {!!famousDetail.famous.tvCast
              && renderFamousDetailSections.renderTVShowCastSection(
                famousDetail.famous.tvCast,
              )}
          </>
        )}
      </Animated.ScrollView>
    </>
  );
};

export default withTheme(FamousDetail);

/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {StatusBar, Animated} from 'react-native';
import {withTheme} from 'styled-components/native';

import ExpansibleTextSection from '@components/common/expansible-text-section/ExpansibleTextSection';
import ProgressiveImage from '@components/common/progressive-image/ProgressiveImage';
import {
  useGetCurrentTheme,
  useShowLanguageAlert,
  useStatusBarStyle,
} from '@hooks';
import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import useRenderFamousDetailSections from './useRenderFamousDetailSections';
import HeaderBackButton from '../../header-back-button/HeaderBackButton';
import {FamousDetailStackProps} from '../routes/route-params-types';
import HeaderInfo from './header/header-info/HeaderInfo';
import useFamousDetail from './useFamousDetail';
import * as Styles from './FamousDetail.styles';
import DeathDay from './death-day/DeathDay';

const FamousDetail = ({navigation, theme, route}: FamousDetailStackProps) => {
  const scrollViewOffset = useRef(new Animated.Value(0)).current;

  const {handleShowLanguageAlert} = useShowLanguageAlert();
  const {currentTheme} = useGetCurrentTheme({theme});
  const {renderTVShowCastSection, renderMovieCastSection, renderImagesSection} =
    useRenderFamousDetailSections({navigation});
  const {barStyle} = useStatusBarStyle({theme});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  const {backgroundImage, isLoading, famous, hasError, t} = useFamousDetail({
    id: route.params.id,
  });

  useEffect(() => {
    if (!isLoading && famous && !famous.biography) {
      handleShowLanguageAlert({
        descriptioni18nRef: TRANSLATIONS.LANGUAGE_WARNING_FAMOUS_DESCRIPTION,
        positive18nRef: TRANSLATIONS.LANGUAGE_WARNING_FAMOUS_POSITIVE_ACTION,
        titlei18nRef: TRANSLATIONS.LANGUAGE_WARNING_FAMOUS_TITLE,
        onPressPositiveAction: () => {},
        singleAction: true,
      });
    }
  }, [isLoading, famous]);

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
      <Styles.BackgroundImageWrapper testID="background-image-wrapper">
        <Animated.View
          style={{
            opacity: scrollViewOffset.interpolate({
              inputRange: [0, metrics.getHeightFromDP('10%')],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}>
          <ProgressiveImage image={backgroundImage} imageType="backdrop" />
        </Animated.View>
        <Styles.SmokeShadow
          // @ts-ignore
          currentTheme={currentTheme}
        />
      </Styles.BackgroundImageWrapper>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollViewOffset},
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        testID="scroll-content">
        <HeaderInfo
          knownForDepartment={famous?.knownForDepartment}
          profileImage={route.params.profileImage}
          placeOfBirth={famous?.placeOfBirth}
          birthDate={famous?.birthday}
          name={route.params.name}
          isLoading={isLoading}
        />
        {!!famous?.deathday && <DeathDay deathDate={famous.deathday} />}
        <Styles.BiographySectionWrapper testID="biography-section">
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

import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import MediaItemDescription from 'components/common/media-item-description/MediaItemDescription';
import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import ImagesList from 'components/common/images-list/ImagesList';
import MovieList from 'components/common/movie-list/MovieList';
import Section from 'components/common/Section';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

// import FamousDetailLoading from './FamousDetailLoading';
import useFamousDetail from './useFamousDetail';
import HeaderInfo from './header/HeaderInfo';
import DeathDay from './death-day/DeathDay';

const PROFILE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;
const PROFILE_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_SIZE_CODE}`;

export const SCREEN_ID = 'FAMOUS_DETAIL';

const SectionWrapper = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const BackgroundImageWrapper = styled(Animated.View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('65%')}px;
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

const data = Array(10)
  .fill({})
  .map((item, index) => ({
    voteAverage: 5.14,
    voteCount: 22,
    image: '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    title: `Movie ${index + 1}`,
    id: index,
  }));

const deathDate = '2020-02-28';

const FamousDetail = () => {
  const { t } = useFamousDetail();

  const scrollViewOffset = useRef(new Animated.Value(0)).current;

  return (
    <>
      <BackgroundImageWrapper
        style={{
          opacity: scrollViewOffset.interpolate({
            inputRange: [0, metrics.getHeightFromDP('16%')],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
        }}
      >
        <ProgressiveImage
          thumbnailURL={`${PROFILE_THUMBNAIL_URL}/if0BTPOSkbnvIjry5OcfV7GfRrO.jpg`}
          imageURL={`${PROFILE_IMAGE_URL}/if0BTPOSkbnvIjry5OcfV7GfRrO.jpg`}
        />
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
      >
        <HeaderInfo
          placeOfBirth="New York City, New York, USA"
          profileImage="/1lz1wLOuPFSRIratMz0SxD3tkJ.jpg"
          knownForDepartment="Actor"
          birthDate="1994-02-21"
          name="Dwayne Johnson"
        />
        {!!deathDate && (
          <SectionWrapper>
            <DeathDay
              deathDate={deathDate}
            />
          </SectionWrapper>
        )}
        <Section
          title={t('translations:famousDetail:images')}
        >
          <ImagesList
            images={[
              '/if0BTPOSkbnvIjry5OcfV7GfRrO.jpg',
              '/bKyFGGxc8JjpGFdBRZLkUALc0bX.jpg',
              '/ye3S7ljIsyLY4exDvD9GCfWMzHe.jpg',
              '/8mYR9V5wq2KKGuDexqrdNfWUOdc.jpg',
              '/4Gq8wD9fBpHGlXMS3VQhzS9EHjg.jpg',
              '/1lz1wLOuPFSRIratMz0SxD3tkJ.jpg',
              '/znyHJBN6r0cONV17R26U31R6VqR.jpg',
              '/oGueBRTafMdxrMG6sbZSrrOAd1r.jpg',
              '/mXxiOTrTMJBRSVRfgaSDhOfvfxU.jpg',
            ]}
          />
        </Section>
        <Section
          title={t('translations:famousDetail:cast')}
          noMarginBottom
        >
          <MovieList
            movies={data}
          />
        </Section>
        <Section
          withHorizontalPadding
          title={t('translations:famousDetail:biography')}
        >
          <MediaItemDescription
            description="er since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          />
        </Section>
      </Animated.ScrollView>
    </>
  );
};

export default FamousDetail;

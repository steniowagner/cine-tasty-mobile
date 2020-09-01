import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

import MovieList from 'components/common/MovieList';
import DeathDay from './death-day/DeathDay';
import HeaderInfo from './header/HeaderInfo';

const PROFILE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;
const PROFILE_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_SIZE_CODE}`;

export const SCREEN_ID = 'FAMOUS_DETAIL';

const SectionTitleText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

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
        <SectionWrapper>
          <SectionTitleText>Cast</SectionTitleText>
        </SectionWrapper>
        <MovieList
          movies={data}
        />
      </Animated.ScrollView>
    </>
  );
};

export default FamousDetail;

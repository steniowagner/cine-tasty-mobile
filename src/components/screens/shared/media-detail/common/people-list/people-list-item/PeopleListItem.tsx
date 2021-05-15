import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './PeopleListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type PeopleListItemProps = {
  onPress: () => void;
  withSubtext: boolean;
  isFirst: boolean;
  subText: string;
  image: string;
  name: string;
  type: string;
};

const PeopleListItem = (props: PeopleListItemProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.image,
  });

  return (
    <Styles.Wrapper
      testID={`button-wrapper-${props.type}`}
      onPress={props.onPress}
    >
      <TMDBImage
        testID="person-image"
        imageType="poster"
        onError={loadListItemImage.onError}
        onLoad={loadListItemImage.onLoad}
        image={props.image}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {loadListItemImage.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: loadListItemImage.opacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: loadListItemImage.hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'account',
            },
          })}
        </Styles.FallbackImageWrapper>
      )}
      <Styles.ContentWrapper>
        <Styles.SmokeShadow />
        <Styles.TextContentWrapper>
          <Styles.PersonNameText
            testID="person-name"
          >
            {props.name}
          </Styles.PersonNameText>
          {props.withSubtext && (
            <Styles.PersonSubText
              testID="person-subtext"
            >
              {props.subText}
            </Styles.PersonSubText>
          )}
        </Styles.TextContentWrapper>
      </Styles.ContentWrapper>
    </Styles.Wrapper>
  );
};

export default PeopleListItem;

import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import useFamousListItem from './useFamousListItem';
import * as Styles from './FamousListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type FamousListItemProps = {
  numberOfColumns: number;
  image?: string;
  onPress: () => void;
  title?: string;
  index: number;
};

const FamousListItem = (props: FamousListItemProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.image,
  });

  const famousListItem = useFamousListItem({
    numberOfColumns: props.numberOfColumns,
    index: props.index,
  });

  return (
    <TouchableOpacity
      testID="famous-list-item-button"
      style={famousListItem.wrapperMeasures}
      onPress={props.onPress}
    >
      <>
        <TMDBImage
          imageType="profile"
          onError={loadListItemImage.onError}
          onLoad={loadListItemImage.onLoad}
          image={props.image}
          style={{
            width: '100%',
            height: '70%',
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
      </>
      <Styles.PersonName>{props.title}</Styles.PersonName>
    </TouchableOpacity>
  );
};

export default memo(FamousListItem, () => true);

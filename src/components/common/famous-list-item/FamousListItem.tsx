import React, { useMemo, memo } from 'react';
import { TouchableOpacity } from 'react-native';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import getWrapperMeasures from './getWrapperMeasures';
import * as Styles from './FamousListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type Props = {
  numberOfColumns: number;
  image?: string;
  onPress: () => void;
  title?: string;
  index: number;
};

const FamousListItem = ({
  numberOfColumns, onPress, image, index, title,
}: Props) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image,
  });

  const wrapperMeasures = useMemo(() => {
    const withMargin = index % numberOfColumns === 1;

    return getWrapperMeasures(withMargin);
  }, []);

  return (
    <TouchableOpacity
      testID="famous-list-item-button"
      style={wrapperMeasures}
      onPress={onPress}
    >
      <>
        <TMDBImage
          imageType="profile"
          onError={onError}
          onLoad={onLoad}
          image={image}
          style={{
            width: '100%',
            height: '70%',
            borderRadius: metrics.extraSmallSize,
          }}
        />
        {isFallbackImageVisible && (
          <Styles.FallbackImageWrapper
            testID="fallback-image-wrapper"
            style={[
              {
                opacity,
              },
            ]}
          >
            {renderSVGIconConditionally({
              condition: hasError,
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
      <Styles.PersonName>{title}</Styles.PersonName>
    </TouchableOpacity>
  );
};

export default memo(FamousListItem, () => true);

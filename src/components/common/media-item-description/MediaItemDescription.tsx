import React from 'react';

import useMediaItemDescription from './useMediaItemDescription';
import * as Styles from './MediaItemDescription.styles';

type MediaItemDescriptionProps = {
  description: string;
};

const MediaItemDescription = (props: MediaItemDescriptionProps) => {
  const mediaItemDescription = useMediaItemDescription();
  return (
    <>
      <Styles.DescriptionText
        // @ts-ignore onTextLayout does exist on Text component
        onTextLayout={({nativeEvent: {lines}}) =>
          mediaItemDescription.onGetTextLayout(lines.length)
        }
        testID="description-text"
        numberOfLines={mediaItemDescription.numberOfLines}>
        {props.description || '-'}
      </Styles.DescriptionText>
      {mediaItemDescription.isReadExpandableButtonVisible && (
        <Styles.ExpandableReadButton
          onPress={mediaItemDescription.onPressReadExpandable}
          testID="expandable-read-button">
          <Styles.ExpandableReadText testID="expandable-read-text">
            {mediaItemDescription.expandableReadButtonText}
          </Styles.ExpandableReadText>
        </Styles.ExpandableReadButton>
      )}
    </>
  );
};

export default MediaItemDescription;

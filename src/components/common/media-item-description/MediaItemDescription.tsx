import React from 'react';

import useMediaItemDescription from './useMediaItemDescription';
import * as Styles from './MediaItemDescription.styles';

type MediaItemDescriptionProps = {
  description: string;
};

const MediaItemDescription = (props: MediaItemDescriptionProps) => {
  const {
    isReadExpandableButtonVisible,
    expandableReadButtonText,
    onPressReadExpandable,
    onGetTextLayout,
    numberOfLines,
  } = useMediaItemDescription();

  return (
    <>
      <Styles.DescriptionText
        // @ts-ignore onTextLayout does exist on Text component
        onTextLayout={({ nativeEvent: { lines } }) => onGetTextLayout(lines.length)}
        testID="description-text"
        numberOfLines={numberOfLines}
      >
        {props.description || '-'}
      </Styles.DescriptionText>
      {isReadExpandableButtonVisible && (
        <Styles.ExpandableReadButton
          onPress={onPressReadExpandable}
          testID="expandable-read-button"
        >
          <Styles.ExpandableReadText
            testID="expandable-read-text"
          >
            {expandableReadButtonText}
          </Styles.ExpandableReadText>
        </Styles.ExpandableReadButton>
      )}
    </>
  );
};

export default MediaItemDescription;

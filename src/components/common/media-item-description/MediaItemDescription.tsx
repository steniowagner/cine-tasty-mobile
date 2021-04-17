import React from 'react';

import useMediaItemDescription from './useMediaItemDescription';
import * as Styles from './MediaItemDescription.styles';

type Props = {
  description: string;
};

const MediaItemDescription = ({ description }: Props) => {
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
        {description || '-'}
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

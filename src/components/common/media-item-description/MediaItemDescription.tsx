import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import useMediaItemDescription from './useMediaItemDescription';

const DescriptionText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Book;
`;

const ExpandableReadText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.2}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
`;

const ExpandableReadButton = styled(TouchableOpacity)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  align-self: flex-end;
`;

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
      <DescriptionText
        // @ts-ignore onTextLayout does exist on Text component
        onTextLayout={({ nativeEvent: { lines } }) => onGetTextLayout(lines.length)}
        testID="description-text"
        numberOfLines={numberOfLines}
      >
        {description}
      </DescriptionText>
      {isReadExpandableButtonVisible && (
        <ExpandableReadButton
          onPress={onPressReadExpandable}
          testID="expandable-read-button"
        >
          <ExpandableReadText
            testID="expandable-read-text"
          >
            {expandableReadButtonText}
          </ExpandableReadText>
        </ExpandableReadButton>
      )}
    </>
  );
};

export default MediaItemDescription;

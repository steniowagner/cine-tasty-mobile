import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

export const NUMBER_ITEMS = 4;

type ExtraTagStyleProp = {
  isExtra: boolean;
};

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  margin-bottom: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const TagWrapper = styled(View)<ExtraTagStyleProp>`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ isExtra, theme }) => (isExtra ? theme.colors.contrast : theme.colors.primary)};
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const TagText = styled(Text)<ExtraTagStyleProp>`
  font-family: CircularStd-Medium;
  color: ${({ isExtra, theme }) => (isExtra ? 'white' : theme.colors.buttonText)};
  text-align: center;
`;

type Props = {
  extraTags: string[];
  isLoading: boolean;
  tags: string[];
};

const Tags = ({ extraTags, isLoading, tags }: Props) => {
  if (isLoading) {
    return (
      <Wrapper
        testID="tags-loading"
      >
        {Array(NUMBER_ITEMS)
          .fill({})
          .map((_, index) => (
            <LoadingPlaceholder
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{
                marginTop: CONSTANTS.VALUES.DEFAULT_SPACING,
                width: metrics.getWidthFromDP('20%'),
                height: metrics.getWidthFromDP('10%'),
                borderRadius: metrics.extraSmallSize,
                marginRight: metrics.smallSize,
              }}
            />
          ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper
      testID="tags"
    >
      {[...extraTags, ...tags].map(
        (tag, index) => !!tag && (
        <TagWrapper
          isExtra={index < extraTags.length}
          testID="tag-wrapper"
          key={tag}
        >
          <TagText
            isExtra={index < extraTags.length}
            testID="tag-text"
          >
            {tag}
          </TagText>
        </TagWrapper>
        ),
      )}
    </Wrapper>
  );
};

export default Tags;

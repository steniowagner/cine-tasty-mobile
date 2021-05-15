import React from 'react';

import LoadingPlaceholder from '@components/common/loading-placeholder/LoadingPlaceholder';
import CONSTANTS from '@utils/constants';
import metrics from '@styles/metrics';

import * as Styles from './Tags.styles';

export const NUMBER_ITEMS = 4;

type TagsProps = {
  extraTags: string[];
  isLoading: boolean;
  tags: string[];
};

const Tags = (props: TagsProps) => {
  if (props.isLoading) {
    return (
      <Styles.Wrapper
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
      </Styles.Wrapper>
    );
  }

  return (
    <Styles.Wrapper
      testID="tags"
    >
      {[...props.extraTags, ...props.tags].map(
        (tag, index) => !!tag && (
        <Styles.TagWrapper
          isExtra={index < props.extraTags.length}
          testID="tag-wrapper"
          key={tag}
        >
          <Styles.TagText
            isExtra={index < props.extraTags.length}
            testID="tag-text"
          >
            {tag}
          </Styles.TagText>
        </Styles.TagWrapper>
        ),
      )}
    </Styles.Wrapper>
  );
};

export default Tags;

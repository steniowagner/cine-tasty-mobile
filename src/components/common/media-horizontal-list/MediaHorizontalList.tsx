import React from 'react';
import Section from '@components/common/section/Section';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';

import * as Styles from './MediaHorizontalList.styles';
import useMediaHorizontalList, {
  UseMediaHorizontalList,
} from './useMediaHorizontalList';

type MediaHorizontalListProps = UseMediaHorizontalList & {
  title: string;
};

const MediaHorizontalList = (props: MediaHorizontalListProps) => {
  const mediaHorizontalList = useMediaHorizontalList(props);
  return (
    <Section title={props.title}>
      <Styles.Wrapper
        showsHorizontalScrollIndicator={false}
        testID={`media-horizontal-list-${props.type}`}
        horizontal>
        {mediaHorizontalList.dataset.map(item => (
          <SimplifiedMediaListItem
            onPress={() => mediaHorizontalList.handlePressItem(item)}
            voteAverage={item.voteAverage}
            voteCount={item.voteCount}
            image={item.posterPath}
            title={item.title}
            key={item.id}
          />
        ))}
      </Styles.Wrapper>
    </Section>
  );
};

export default MediaHorizontalList;

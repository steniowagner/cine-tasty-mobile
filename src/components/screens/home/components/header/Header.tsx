import React, { useRef } from 'react';
import { Platform, Animated, View } from 'react-native';
import styled from 'styled-components';

import metrics from 'styles/metrics';

import HeaderListItem from './HeaderListItem';

const ITEM_WIDTH = metrics.getWidthFromDP('75%');
const SPACER_ITEM_SIZE = (metrics.width - (ITEM_WIDTH + 2 * metrics.largeSize)) / 2;

const GapFlatlist = styled(View)`
  width: ${SPACER_ITEM_SIZE}px;
  height: 1px;
`;

const data = [
  {
    image: '/72I82eKXCadZWEYygV9GkJOQNEq.jpg',
    title: 'Mulan',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'War'],
    id: 1,
    votes: 0.2,
  },
  {
    image: '/uOw5JD8IlD546feZ6oxbIjvN66P.jpg',
    title: 'Rogue',
    genres: ['Action'],
    id: 2,
    votes: 5.2,
  },
  {
    image: '/dGVUiqnahQ4ZZRchGRpO2SyhtQY.jpg',
    title: 'Península',
    genres: ['Action', 'Horror', 'Thriller'],
    id: 3,
    votes: 8.3,
  },
];

const Header = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Animated.FlatList
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        ListHeaderComponent={() => <GapFlatlist />}
        ListFooterComponent={() => <GapFlatlist />}
        renderItem={({ item, index }) => {
          const translateY = scrollX.interpolate({
            inputRange: [
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
              (index + 1) * ITEM_WIDTH,
            ],
            outputRange: [50, 0, 50],
            extrapolate: 'clamp',
          });

          return (
            <HeaderListItem
              onPress={() => {}}
              isTheMiddle={index === 1}
              translateY={translateY}
              genres={item.genres}
              width={ITEM_WIDTH}
              image={item.image}
              title={item.title}
              votes={item.votes}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_data, index) => ({
          offset: ITEM_WIDTH * index,
          length: ITEM_WIDTH,
          index,
        })}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
        keyExtractor={({ id }) => `${id}`}
        renderToHardwareTextureAndroid
        removeClippedSubviews={false}
        snapToInterval={ITEM_WIDTH}
        scrollEventThrottle={16}
        snapToAlignment="start"
        initialScrollIndex={1}
        bounces={false}
        data={data}
        horizontal
      />
    </>
  );
};

export default Header;

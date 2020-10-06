import React, { useRef } from 'react';
import { Platform, Animated } from 'react-native';

import { HomeTop3Item } from 'types';

import { GapFlatlist, ListWrapper, ITEM_WIDTH } from './commonStyles';
import Top3ListItem from './Top3ListItem';

type Props = {
  onPressLearnMore: (id: number) => void;
  top3Items: HomeTop3Item[];
};

const Top3 = ({ onPressLearnMore, top3Items }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <ListWrapper>
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
            <Top3ListItem
              onPress={() => onPressLearnMore(item.id)}
              voteAverage={item.voteAverage}
              voteCount={item.voteCount}
              isTheMiddle={index === 1}
              translateY={translateY}
              genres={item.genres}
              width={ITEM_WIDTH}
              image={item.image}
              title={item.title}
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
        testID="top3-list"
        data={top3Items}
        bounces={false}
        horizontal
      />
    </ListWrapper>
  );
};

export default Top3;

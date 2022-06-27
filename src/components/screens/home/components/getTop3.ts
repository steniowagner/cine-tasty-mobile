import * as Types from '@local-types';

type OnPressTop3Item = (item: Types.SimplifiedMedia) => void;

const generateTop3Indexes = (maxIndex: number) => {
  const indexes = [];
  while (indexes.length < 3) {
    const index = Math.floor(Math.random() * (maxIndex - 1));
    if (!indexes.includes(index)) {
      indexes.push(index);
    }
  }
  return indexes;
};

export const getTop3 = (
  dataset: Types.SimplifiedMedia[],
  onPress: OnPressTop3Item,
) =>
  generateTop3Indexes(dataset.length - 1).map(index => ({
    ...dataset[index],
    onPress: () => onPress(dataset[index]),
  }));

export const scrollFlatListToEnd = {
  nativeEvent: {
    contentOffset: {
      x: 0,
      y: 425,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 885,
      width: 328,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 469,
      width: 328,
    },
  },
};

const getRandomZeroBasedIndex = <T>(array: T[]) =>
  (Math.random() * (array.length - 1 - 0 + 1)) << 0;

export const randomPositiveNumber = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomArrayElement = <T>(array: T[], avoid?: number[]) => {
  if (!avoid || !avoid.length) {
    const randomZeroBasedIndex = getRandomZeroBasedIndex(array);
    return array[randomZeroBasedIndex];
  }
  while (true) {
    const randomZeroBasedIndex = getRandomZeroBasedIndex(array);
    if (!avoid.includes(randomZeroBasedIndex)) {
      return array[randomZeroBasedIndex];
    }
  }
};

export const randomArrayIndex = <T>(array: T[], avoid?: number[]) => {
  if (!avoid || !avoid.length) {
    return getRandomZeroBasedIndex(array);
  }
  while (true) {
    const randomZeroBasedIndex = getRandomZeroBasedIndex(array);
    if (!avoid.includes(randomZeroBasedIndex)) {
      return randomZeroBasedIndex;
    }
  }
};

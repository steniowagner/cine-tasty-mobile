export const shuffleDataset = <T>(dataset: T[]): T[] => {
  const shuffledDataset = Object.create(dataset);
  let currentIndex = shuffledDataset.length;
  let randomIndex: number;
  let temporaryValue: T;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffledDataset[currentIndex];
    shuffledDataset[currentIndex] = shuffledDataset[randomIndex];
    shuffledDataset[randomIndex] = temporaryValue;
  }
  return shuffledDataset;
};

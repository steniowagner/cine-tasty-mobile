const getRandomIndexBetweenLimits = (min: number, max: number): number => {
  const indexSelected = Math.floor(Math.random() * (max - min)) + min;

  return indexSelected;
};

const getRandomImageFromDataset = (dataset: string[], imageToExclude: string): string => {
  const datasetWithoutImageToExclude = dataset.filter((image) => image !== imageToExclude);
  const max = Math.floor(datasetWithoutImageToExclude.length);
  const min = 0;

  const indexSelected = getRandomIndexBetweenLimits(min, max);

  return datasetWithoutImageToExclude[indexSelected];
};

export default getRandomImageFromDataset;

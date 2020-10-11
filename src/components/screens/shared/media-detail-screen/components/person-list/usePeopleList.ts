import { useCallback } from 'react';

import { CrewDataset, CastDataset } from 'types';

type PersonListItem = {
  subText: string;
  image: string;
  name: string;
  id: string;
};

type Props = {
  dataset: CrewDataset | CastDataset;
  type: 'cast' | 'crew';
};

type State = {
  items: PersonListItem[];
};

const usePeopleList = ({ dataset, type }: Props): State => {
  const parseCrewToPersonListItem = useCallback(
    (crew: CrewDataset): PersonListItem[] => crew.map(({
      job, profilePath, name, id,
    }) => ({
      image: profilePath,
      subText: job,
      name,
      id,
    })),
    [],
  );

  const parseCastToPersonListItem = useCallback(
    (cast: CastDataset): PersonListItem[] => cast.map(({
      character, profilePath, name, id,
    }) => ({
      image: profilePath,
      subText: character,
      name,
      id,
    })),
    [],
  );

  const parseDatasetToPersonListItemDataset = useCallback(() => {
    if (type === 'cast') {
      const cast = dataset as CastDataset;

      return parseCastToPersonListItem(cast);
    }

    const crew = dataset as CrewDataset;

    return parseCrewToPersonListItem(crew);
  }, [dataset, type]);

  return {
    items: parseDatasetToPersonListItemDataset(),
  };
};

export default usePeopleList;

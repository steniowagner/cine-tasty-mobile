import { useCallback } from 'react';

import { CrewDataset, CastDataset } from 'types';

type PeopleListItem = {
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
  items: PeopleListItem[];
};

const usePeopleList = ({ dataset, type }: Props): State => {
  const mergeCrewMemebersBySimilarJobs = useCallback(
    (crew: PeopleListItem[]): PeopleListItem[] => {
      const repeatedItemsMap = {};

      const repeatedCrewItems = crew.filter(({ subText, id }) => {
        if (!repeatedItemsMap[id]) {
          repeatedItemsMap[id] = [subText];
          return true;
        }

        repeatedItemsMap[id] = [...repeatedItemsMap[id], subText];

        return false;
      });

      return repeatedCrewItems.map((repeatedCrewItem) => ({
        ...repeatedCrewItem,
        subText: repeatedItemsMap[repeatedCrewItem.id].join('/'),
      }));
    },
    [],
  );

  const parseCrewToPeopleListItem = useCallback((crew: CrewDataset): PeopleListItem[] => {
    const crewParsedToPeople = crew.map(({
      job, profilePath, name, id,
    }) => ({
      image: profilePath,
      subText: job,
      name,
      id,
    }));

    return mergeCrewMemebersBySimilarJobs(crewParsedToPeople);
  }, []);

  const parseCastToPeopleListItem = useCallback(
    (cast: CastDataset): PeopleListItem[] => cast.map(({
      character, profilePath, name, id,
    }) => ({
      image: profilePath,
      subText: character,
      name,
      id,
    })),
    [],
  );

  const parseDatasetToPeopleListItemDataset = useCallback(() => {
    if (type === 'cast') {
      const cast = dataset as CastDataset;

      return parseCastToPeopleListItem(cast);
    }

    const crew = dataset as CrewDataset;

    return parseCrewToPeopleListItem(crew);
  }, [dataset, type]);

  return {
    items: parseDatasetToPeopleListItemDataset(),
  };
};

export default usePeopleList;

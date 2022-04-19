import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

export type PeopleListItemType = {
  subText: string;
  image: string;
  name: string;
  id: string;
};

type UsePeopleListProps = {
  dataset:
    | SchemaTypes.TVShowDetail_tvShow_createdBy[]
    | Types.CrewDataset
    | Types.CastDataset;
  type: 'cast' | 'crew' | 'creator';
};

export const usePeopleList = (props: UsePeopleListProps) => {
  const mergeCrewMemebersBySimilarJobs = useCallback(
    (crew: PeopleListItemType[]): PeopleListItemType[] => {
      const repeatedItemsMap = {};
      const repeatedCrewItems = crew.filter(({subText, id}) => {
        if (!repeatedItemsMap[id]) {
          repeatedItemsMap[id] = [subText];
          return true;
        }
        repeatedItemsMap[id] = [...repeatedItemsMap[id], subText];
        return false;
      });
      return repeatedCrewItems.map(repeatedCrewItem => ({
        ...repeatedCrewItem,
        subText: repeatedItemsMap[repeatedCrewItem.id].join('/'),
      }));
    },
    [],
  );

  const parseCrewToPeopleListItem = useCallback(
    (crew: Types.CrewDataset): PeopleListItemType[] => {
      const crewParsedToPeople = crew.map(({job, profilePath, name, id}) => ({
        subText: job || '-',
        image: profilePath,
        name,
        id,
      }));
      return mergeCrewMemebersBySimilarJobs(crewParsedToPeople);
    },
    [],
  );

  const parseCastToPeopleListItem = useCallback(
    (cast: Types.CastDataset): PeopleListItemType[] =>
      cast.map(({character, profilePath, name, id}) => ({
        subText: character || '-',
        image: profilePath,
        name,
        id,
      })),
    [],
  );

  const parseDatasetToPeopleListItemDataset = useCallback(() => {
    if (props.type === 'cast') {
      return parseCastToPeopleListItem(props.dataset as Types.CastDataset);
    }
    return parseCrewToPeopleListItem(props.dataset as Types.CrewDataset);
  }, [props.dataset, props.type]);

  return {
    items: parseDatasetToPeopleListItemDataset(),
  };
};

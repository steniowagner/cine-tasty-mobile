import * as SchemaTypes from '@schema-types';

export const famousList = (size: number) => Array(size)
  .fill({})
  .map((_, index) => ({
    profilePath: `profilePath-${index}`,
    name: `name-${index}`,
    id: index,
    __typename: 'BasePerson',
  })) as SchemaTypes.GetFamous_people_items[];

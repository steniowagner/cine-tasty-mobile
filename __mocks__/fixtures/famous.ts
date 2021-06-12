export const famousItems = Array(5)
  .fill({})
  .map((_, index) => ({
    profilePath: `profilePath-${index}`,
    name: `name-${index}`,
    id: index,
    __typename: 'BasePerson',
  }));

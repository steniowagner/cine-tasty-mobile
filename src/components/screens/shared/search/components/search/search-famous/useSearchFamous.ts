import {useMemo} from 'react';

import * as SchemaTypes from '@schema-types';

type UseSearchFamous = {
  dataset: SchemaTypes.SearchPerson_search_items_BasePerson[];
};

const useSearchFamous = (props: UseSearchFamous) => {
  const famous = useMemo(
    () =>
      props.dataset.map(item => ({
        profileImage: item.image,
        name: item.title,
        id: item.id,
      })),
    [props.dataset],
  );

  return {
    famous,
  };
};

export default useSearchFamous;

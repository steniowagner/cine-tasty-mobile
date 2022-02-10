import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const categories: Types.QuestionCategory[] = [
  {
    value: SchemaTypes.QuestionCategory.MIXED,
    id: 'mixed',
  },
  {
    value: SchemaTypes.QuestionCategory.MOVIE,
    id: 'movies',
  },
  {
    value: SchemaTypes.QuestionCategory.TV,
    id: 'tv',
  },
];

export default categories;

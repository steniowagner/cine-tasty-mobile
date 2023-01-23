import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const categories: Types.QuestionCategory[] = [
  {
    value: SchemaTypes.QuestionCategory.MIXED,
    option: 'category',
    id: 'mixed',
  },
  {
    value: SchemaTypes.QuestionCategory.MOVIE,
    option: 'category',
    id: 'movie',
  },
  {
    value: SchemaTypes.QuestionCategory.TV,
    option: 'category',
    id: 'tv',
  },
];

export default categories;

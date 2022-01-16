import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const categories: Types.QuestionOption<SchemaTypes.QuestionCategory>[] = [
  {
    value: SchemaTypes.QuestionCategory.MIXED,
    id: 'categoryMixed',
  },
  {
    value: SchemaTypes.QuestionCategory.MOVIE,
    id: 'categoryMovie',
  },
  {
    value: SchemaTypes.QuestionCategory.TV,
    id: 'categoryTv',
  },
];

export default categories;

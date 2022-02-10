import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const types: Types.QuestionType[] = [
  {
    value: SchemaTypes.QuestionType.MIXED,
    id: 'mixed',
  },
  {
    value: SchemaTypes.QuestionType.MULTIPLE,
    id: 'multiple',
  },
  {
    value: SchemaTypes.QuestionType.BOOLEAN,
    id: 'boolean',
  },
];

export default types;

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const types: Types.QuestionType[] = [
  {
    value: SchemaTypes.QuestionType.MIXED,
    option: 'type',
    id: 'mixed',
  },
  {
    value: SchemaTypes.QuestionType.MULTIPLE,
    option: 'type',
    id: 'multiple',
  },
  {
    value: SchemaTypes.QuestionType.BOOLEAN,
    option: 'type',
    id: 'boolean',
  },
];

export default types;

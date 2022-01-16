import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const types: Types.QuestionOption<SchemaTypes.QuestionType>[] = [
  {
    value: SchemaTypes.QuestionType.MIXED,
    id: 'typeMixed',
  },
  {
    value: SchemaTypes.QuestionType.MULTIPLE,
    id: 'typeMultiple',
  },
  {
    value: SchemaTypes.QuestionType.BOOLEAN,
    id: 'typeBoolean',
  },
];

export default types;

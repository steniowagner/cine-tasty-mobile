import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const difficulties: Types.QuestionDifficulty[] = [
  {
    value: SchemaTypes.QuestionDifficulty.MIXED,
    id: 'mixed',
  },
  {
    value: SchemaTypes.QuestionDifficulty.EASY,
    id: 'easy',
  },
  {
    value: SchemaTypes.QuestionDifficulty.MEDIUM,
    id: 'medium',
  },
  {
    value: SchemaTypes.QuestionDifficulty.HARD,
    id: 'hard',
  },
];

export default difficulties;

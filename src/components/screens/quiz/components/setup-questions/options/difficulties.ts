import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const difficulties: Types.QuestionDifficulty[] = [
  {
    value: SchemaTypes.QuestionDifficulty.MIXED,
    option: 'difficulty',
    id: 'mixed',
  },
  {
    value: SchemaTypes.QuestionDifficulty.EASY,
    option: 'difficulty',
    id: 'easy',
  },
  {
    value: SchemaTypes.QuestionDifficulty.MEDIUM,
    option: 'difficulty',
    id: 'medium',
  },
  {
    value: SchemaTypes.QuestionDifficulty.HARD,
    option: 'difficulty',
    id: 'hard',
  },
];

export default difficulties;

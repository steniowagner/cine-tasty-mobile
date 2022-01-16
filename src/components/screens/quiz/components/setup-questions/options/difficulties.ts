import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

const difficulties: Types.QuestionOption<SchemaTypes.QuestionDifficulty>[] = [
  {
    value: SchemaTypes.QuestionDifficulty.MIXED,
    id: 'difficultyMixed',
  },
  {
    value: SchemaTypes.QuestionDifficulty.EASY,
    id: 'difficultyEasy',
  },
  {
    value: SchemaTypes.QuestionDifficulty.MEDIUM,
    id: 'difficultyMedium',
  },
  {
    value: SchemaTypes.QuestionDifficulty.HARD,
    id: 'difficultyHard',
  },
];

export default difficulties;

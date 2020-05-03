import { QuestionDifficulty } from 'types/schema';
import { QuestionOption } from 'types';

const difficulties: QuestionOption<QuestionDifficulty>[] = [
  {
    id: 'difficultyMixed',
    value: QuestionDifficulty.MIXED,
  },
  {
    id: 'difficultyEasy',
    value: QuestionDifficulty.EASY,
  },
  {
    id: 'difficultyMedium',
    value: QuestionDifficulty.MEDIUM,
  },
  {
    id: 'difficultyHard',
    value: QuestionDifficulty.HARD,
  },
];

export default difficulties;

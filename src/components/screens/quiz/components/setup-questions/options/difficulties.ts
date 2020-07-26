import { QuestionDifficulty } from 'types/schema';
import { QuestionOption } from 'types';

const difficulties: QuestionOption<QuestionDifficulty>[] = [
  {
    value: QuestionDifficulty.MIXED,
    id: 'difficultyMixed',
  },
  {
    value: QuestionDifficulty.EASY,
    id: 'difficultyEasy',
  },
  {
    value: QuestionDifficulty.MEDIUM,
    id: 'difficultyMedium',
  },
  {
    value: QuestionDifficulty.HARD,
    id: 'difficultyHard',
  },
];

export default difficulties;

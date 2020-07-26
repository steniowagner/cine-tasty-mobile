import { QuestionCategory } from 'types/schema';
import { QuestionOption } from 'types';

const categories: QuestionOption<QuestionCategory>[] = [
  {
    value: QuestionCategory.MIXED,
    id: 'categoryMixed',
  },
  {
    value: QuestionCategory.MOVIE,
    id: 'categoryMovie',
  },
  {
    value: QuestionCategory.TV,
    id: 'categoryTv',
  },
];

export default categories;

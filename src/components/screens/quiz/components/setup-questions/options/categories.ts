import { QuestionCategory } from 'types/schema';
import { QuestionOption } from 'types';

const categories: QuestionOption<QuestionCategory>[] = [
  {
    id: 'categoryMixed',
    value: QuestionCategory.MIXED,
  },
  {
    id: 'categoryMovie',
    value: QuestionCategory.MOVIE,
  },
  {
    id: 'categoryTv',
    value: QuestionCategory.TV,
  },
];

export default categories;

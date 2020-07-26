import { QuestionType } from 'types/schema';
import { QuestionOption } from 'types';

const types: QuestionOption<QuestionType>[] = [
  {
    value: QuestionType.MIXED,
    id: 'typeMixed',
  },
  {
    value: QuestionType.MULTIPLE,
    id: 'typeMultiple',
  },
  {
    value: QuestionType.BOOLEAN,
    id: 'typeBoolean',
  },
];

export default types;

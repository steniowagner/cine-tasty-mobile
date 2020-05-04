import { QuestionType } from 'types/schema';
import { QuestionOption } from 'types';

const types: QuestionOption<QuestionType>[] = [
  {
    id: 'typeMixed',
    value: QuestionType.MIXED,
  },
  {
    id: 'typeMultiple',
    value: QuestionType.MULTIPLE,
  },
  {
    id: 'typeBoolean',
    value: QuestionType.BOOLEAN,
  },
];

export default types;

import { SimpleQuestion } from './SimpleQuestion';

export type MultipartQuestion = {
  type: 'multipart';
  statement: string;
  subquestions: SimpleQuestion[];
};

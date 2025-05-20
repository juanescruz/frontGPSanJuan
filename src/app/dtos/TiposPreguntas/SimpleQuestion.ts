export type SimpleQuestion = {
  type: 'single-choice' | 'multiple-choice';
  statement: string;
  choices: string[];
  correct_option: any;
  points: number;
};

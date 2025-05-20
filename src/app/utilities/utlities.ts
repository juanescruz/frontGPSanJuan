import { MultipartQuestion } from '../dtos/TiposPreguntas/Multipart';
import { SimpleQuestion } from '../dtos/TiposPreguntas/SimpleQuestion';
import { True_False } from '../dtos/TiposPreguntas/True_False';

export function sumPoints(
  questions: (SimpleQuestion | MultipartQuestion | True_False)[]
) {
  let points = 0;
  for (const question of questions) {
    if (question.type != 'multipart') {
      points += question.points;
    } else {
      for (const subquestion of question.subquestions) {
        points += subquestion.points;
      }
    }
  }

  return points;
}

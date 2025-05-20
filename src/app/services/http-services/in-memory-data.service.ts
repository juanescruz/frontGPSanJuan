import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const examen = [
      {
        mensaje: 'correcto',
        error: false,
        respuesta: {
          time: 1800,
          title: 'parcial de redes',
          questions: [
            {
              type: 'single-choice',
              statement: 'cual de los siguientes es una herramienta devops',
              choices: ['C#', 'DNS', 'Jenkins', 'React Native'],
            },
          ],
        },
      },
    ];
    return { examen };
  }
}

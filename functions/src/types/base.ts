export interface Question {
  id: string;
  question: string;
  number: number;
  word: string;
}

export interface Game extends Question {
  lifes: number;
  letters: string;
  startTimestamp: number;
}

export interface Result extends Game {
  success: boolean;
  endTimestamp: number;
}

export interface Question {
  id: string;
  question: string;
  number: number;
}

export interface Game {
  questionId: string;
  lifes: number;
  question: string;
  lettersUsed: string;
  startTimestamp: number;
  number: number;
}

export interface Result extends Game {
  word: string;
  success: boolean;
  endTimestamp: number;
}

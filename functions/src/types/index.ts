export interface СheckLetterRequest {
  questionId: string;
  letter: string;
}
export interface CheckLetterResponse extends СheckLetterRequest {
  result: boolean;
}

export interface GetQuestionRequest {
  number: number;
}

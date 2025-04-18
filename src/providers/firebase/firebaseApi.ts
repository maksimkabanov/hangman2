import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp } from "./firebase";
import {
  СheckLetterRequest,
  CheckLetterResponse,
  GetQuestionRequest,
} from "@firebaseTypes/index";
import { Question } from "@firebaseTypes/base";

const functions = getFunctions(firebaseApp);

export const firebaseFunctionCheckLetter = async (
  questionId: string,
  letter: string
) => {
  const checkLetterCallable = httpsCallable<
    СheckLetterRequest,
    CheckLetterResponse
  >(functions, "checkLetter");

  return await checkLetterCallable({ questionId, letter });
};

export const firebaseFunctionGetQuestion = async (number: number) => {
  const getQuestionCallable = httpsCallable<GetQuestionRequest, Question>(
    functions,
    "getQuestion"
  );

  return await getQuestionCallable({ number });
};

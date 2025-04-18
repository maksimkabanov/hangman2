import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp } from "./firebase";
import { СheckResultRequest, GetQuestionRequest } from "@firebaseTypes/index";
import { Question } from "@firebaseTypes/base";

const functions = getFunctions(firebaseApp);

export const firebaseFunctionCheckResult = async (
  questionId: string,
  letters: string
) => {
  const checkResultCallable = httpsCallable<СheckResultRequest, Question>(
    functions,
    "checkResult"
  );

  return await checkResultCallable({ questionId, letters });
};

export const firebaseFunctionGetQuestion = async (number: number) => {
  const getQuestionCallable = httpsCallable<GetQuestionRequest, Question>(
    functions,
    "getQuestion"
  );

  return await getQuestionCallable({ number });
};

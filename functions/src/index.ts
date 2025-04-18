/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {
  HttpsError,
  onCall,
  CallableRequest,
} from "firebase-functions/v2/https";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  CheckLetterResponse,
  GetQuestionRequest,
  СheckLetterRequest,
} from "./types";
import { Question } from "./types/base";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

export const checkLetter = onCall(
  async (request: CallableRequest<СheckLetterRequest>) => {
    if (!request.data || !request.data.questionId || !request.data.letter) {
      throw new HttpsError("invalid-argument", "Invalid or missing arguments");
    }

    const { questionId, letter } = request.data;

    const questionRef = getFirestore().collection("questions").doc(questionId);
    const docSnap = await questionRef.get();

    if (!docSnap.exists) {
      throw new HttpsError("not-found", "Question not found");
    }
    const questionData = docSnap.data();
    if (!questionData) {
      throw new HttpsError("not-found", "Question not found");
    }

    return {
      questionId,
      letter,
      result: questionData.word.indexOf(letter) !== -1,
    } as CheckLetterResponse;
  }
);

export const getQuestion = onCall(
  async (request: CallableRequest<GetQuestionRequest>) => {
    const number = request.data?.number;

    if (number === undefined || isNaN(Number(number))) {
      throw new HttpsError("invalid-argument", "Invalid or missing arguments");
    }

    const questionRef = getFirestore().collection("questions");
    const snapshot = await questionRef.where("number", "==", number).get();

    if (snapshot.empty) {
      throw new HttpsError("not-found", `Question #${number} not found`);
    }

    const questionData = snapshot.docs[0];
    if (!questionData) {
      throw new HttpsError("not-found", `Question #${number} not found`);
    }

    return {
      question: questionData.data().question,
      id: questionData.data().id,
      number: number,
    } as Question;
  }
);

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
import { СheckResultRequest, GetQuestionRequest } from "./types";
import { Question } from "./types/base";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

export const checkResult = onCall(
  async (request: CallableRequest<СheckResultRequest>) => {
    if (!request.data || !request.data.questionId || !request.data.letters) {
      throw new HttpsError("invalid-argument", "Invalid or missing arguments");
    }

    const { questionId, letters } = request.data;

    const questionRef = getFirestore().collection("questions").doc(questionId);
    const docSnap = await questionRef.get();

    if (!docSnap.exists) {
      throw new HttpsError("not-found", "Question not found");
    }
    const { question, word: wordString, number } = docSnap.data() as Question;

    const word = Array.from(wordString)
      .map((letter) => (letters.indexOf(letter) > -1 ? letter : "?"))
      .join("");

    return {
      question,
      id: docSnap.id,
      number,
      word,
    } as Question;
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

    const { question, word: wordString } = questionData.data();

    const word = Array.from({ length: wordString.length }, () => "?").join("");

    return {
      question,
      id: questionData.id,
      number,
      word,
    } as Question;
  }
);

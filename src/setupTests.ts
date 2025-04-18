import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

jest.mock("./providers/firebase/firebase.config", () => ({
  firebaseConfig: {
    apiKey: "fake-key",
    authDomain: "fake-domain",
    projectId: "fake-id",
    storageBucket: "fake-storage",
    messagingSenderId: "123456",
    appId: "fake-app-id",
    measurementId: "G-XXXXXX",
  },
}));

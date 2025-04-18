import { Result, Game } from "@firebaseTypes/base";

export interface LocalStorageItem {
  results: Result[];
  currentGame: Game | null;
}

const LOCAL_STORAGE_KEY = "HANGMAN2";

let localStorageValue: LocalStorageItem | undefined;

export const getLocalStorageValue = () => {
  try {
    if (!localStorageValue) {
      const jsonValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      localStorageValue = jsonValue
        ? JSON.parse(jsonValue)
        : { results: [], currentGame: null };
    }
    return localStorageValue;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return undefined;
  }
};
export const saveToLocalStorage = (item: LocalStorageItem) => {
  try {
    const jsonValue = JSON.stringify(item);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonValue);
    localStorageValue = item;
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};
export const updateLocalStorage = (part: Partial<LocalStorageItem>) => {
  if (!localStorageValue)
    throw new Error("Local storage value have not received yet!");
  const item = { ...localStorageValue, ...part };
  saveToLocalStorage(item);
};

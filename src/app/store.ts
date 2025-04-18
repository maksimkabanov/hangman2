import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { currentGameSlice } from "../features/CurrentGame/CurrentGameSlice";
import { resultsSlice } from "../features/Results/ResultsSlice";

export const appStore = configureStore({
  reducer: {
    currentGame: currentGameSlice.reducer,
    results: resultsSlice.reducer,
  },
});

export type AppStore = typeof appStore;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

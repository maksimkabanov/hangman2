import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ResultsComponent } from "../Results/ResultsComponent";
import { resultsSlice } from "../Results/ResultsSlice";
import { gameSlice } from "../Game/GameSlice";

// Mock the NewGameButton component
jest.mock("../NewGameButton/NewGameButtonComponent", () => ({
  NewGameButton: () => <button data-testid="new-game-button">New Game</button>,
}));

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      currentGame: gameSlice.reducer,
      results: resultsSlice.reducer,
    },
    preloadedState: {
      currentGame: {
        game: null,
        resultToShow: null,
        gameIsLoading: false,
        letterCkecking: "",
      },
      results: {
        results: [],
        ...initialState,
      },
    },
  });
};

describe("ResultsComponent", () => {
  it("renders correctly with no results", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ResultsComponent />
      </Provider>
    );

    expect(screen.getByText("Games : 0")).toBeInTheDocument();
    expect(screen.getByTestId("new-game-button")).toBeInTheDocument();
  });

  it("renders correctly with results", () => {
    const mockResults = [
      {
        id: "1",
        word: "TEST",
        letters: "TEST",
        success: true,
        question: "Test Question",
        startTimestamp: 1000,
        endTimestamp: 2000,
        lifes: 5,
        finished: true,
        number: 2,
      },
      {
        id: "2",
        word: "WORD",
        letters: "WORD",
        success: true,
        question: "Another Question",
        startTimestamp: 3000,
        endTimestamp: 4000,
        lifes: 4,
        finished: true,
        number: 1,
      },
    ];

    const store = createTestStore({
      results: mockResults,
    });

    render(
      <Provider store={store}>
        <ResultsComponent />
      </Provider>
    );

    expect(screen.getByText("Games : 2")).toBeInTheDocument();
    expect(screen.getByTestId("new-game-button")).toBeInTheDocument();
  });

  it("does not show new game button when there is a current game not in results", () => {
    const mockResults = [
      {
        id: "1",
        word: "TEST",
        letters: "TEST",
        success: true,
        question: "Test Question",
        startTimestamp: 1000,
        endTimestamp: 2000,
        lifes: 5,
        finished: true,
        number: 1,
      },
    ];

    const mockCurrentGame = {
      id: "2",
      word: "WORD",
      letters: "",
      lifes: 5,
      finished: false,
      question: "Another Question",
      startTimestamp: 3000,
      number: 2,
    };

    const store = createTestStore({
      results: mockResults,
    });

    // Override the game state
    store.getState().currentGame.game = mockCurrentGame;

    render(
      <Provider store={store}>
        <ResultsComponent />
      </Provider>
    );

    expect(screen.getByText("Games : 1")).toBeInTheDocument();
    expect(screen.queryByTestId("new-game-button")).not.toBeInTheDocument();
  });

  it("shows new game button when current game is in results", () => {
    const mockResults = [
      {
        id: "1",
        word: "TEST",
        letters: "TEST",
        success: true,
        question: "Test Question",
        startTimestamp: 1000,
        endTimestamp: 2000,
        lifes: 5,
        finished: true,
        number: 1,
      },
    ];

    const mockCurrentGame = {
      id: "1", // Same ID as in results
      word: "TEST",
      letters: "TEST",
      lifes: 5,
      finished: true,
      question: "Test Question",
      startTimestamp: 1000,
      number: 1,
    };

    const store = createTestStore({
      results: mockResults,
    });

    // Override the game state
    store.getState().currentGame.game = mockCurrentGame;

    render(
      <Provider store={store}>
        <ResultsComponent />
      </Provider>
    );

    expect(screen.getByText("Games : 1")).toBeInTheDocument();
    expect(screen.getByTestId("new-game-button")).toBeInTheDocument();
  });
});

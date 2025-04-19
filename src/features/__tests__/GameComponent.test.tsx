import { render, screen, fireEvent } from "../../test-utils";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { GameComponent } from "../Game/GameComponent";
import { gameSlice } from "../Game/GameSlice";
import { checkLetter } from "../../actions/gameActions";

// Mock the dependencies
jest.mock("../../actions/gameActions", () => ({
  checkLetter: jest.fn(() => () => {}),
}));

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      currentGame: gameSlice.reducer,
    },
    preloadedState: {
      currentGame: {
        game: null,
        resultToShow: null,
        gameIsLoading: false,
        letterCkecking: "",
        ...initialState,
      },
    },
  });
};

describe("GameComponent", () => {
  it("renders loading state when no game is in progress", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <GameComponent />
      </Provider>
    );

    expect(
      screen.getByAltText("Max's hangman character new game")
    ).toBeInTheDocument();
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  it("renders game state when a game is in progress", () => {
    const mockGame = {
      word: "test",
      letters: "",
      lifes: 5,
      finished: false,
      question: "Test Question",
    };

    const store = createTestStore({
      game: mockGame,
    });

    render(
      <Provider store={store}>
        <GameComponent />
      </Provider>
    );

    expect(screen.getByText("Test Question")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("handles letter clicks correctly", () => {
    const mockGame = {
      word: "test",
      letters: "",
      lifes: 5,
      finished: false,
      question: "Test Question",
    };

    const store = createTestStore({
      game: mockGame,
    });

    render(
      <Provider store={store}>
        <GameComponent />
      </Provider>
    );

    const letterButton = screen.getByText("b");
    fireEvent.click(letterButton);

    expect(checkLetter).toHaveBeenCalledWith("b");
  });

  it("shows new game button when game is finished", () => {
    const mockGame = {
      word: "test",
      letters: "test",
      lifes: 5,
      finished: true,
      question: "Test Question",
    };

    const store = createTestStore({
      game: mockGame,
    });

    render(
      <Provider store={store}>
        <GameComponent />
      </Provider>
    );

    const newGameButton = screen.getByText("New Game").closest("button");
    expect(newGameButton).toBeInTheDocument();
  });

  it("applies correct color classes based on remaining lives", () => {
    const mockGame = {
      word: "test",
      letters: "",
      lifes: 3,
      finished: false,
      question: "Test Question",
    };

    const store = createTestStore({
      game: mockGame,
    });

    render(
      <Provider store={store}>
        <GameComponent />
      </Provider>
    );

    const livesElement = screen.getByText("3");
    expect(livesElement).toHaveClass("text-yellow-400", "shadow-yellow-400");
  });
});

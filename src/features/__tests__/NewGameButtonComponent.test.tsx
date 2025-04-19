import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NewGameButton } from "../NewGameButton/NewGameButtonComponent";
import { startNewGame } from "../../actions/gameActions";

// Mock the dependencies
jest.mock("../../actions/gameActions", () => ({
  startNewGame: jest.fn(() => () => {}),
}));

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      game: (state = {}) => state,
    },
  });
};

describe("NewGameButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <NewGameButton />
      </Provider>
    );

    expect(screen.getByText("New Game")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "new game");
  });

  it("renders correctly with dark theme", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <NewGameButton dark={true} />
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("from-emerald-400");
  });

  it("dispatches startNewGame action when clicked", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <NewGameButton />
      </Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(startNewGame).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from "../../test-utils";
import { Statistics } from "../Statistics";

describe("Statistics", () => {
  it("renders statistics title", () => {
    render(<Statistics />);
    expect(screen.getByText("Statistics")).toBeInTheDocument();
  });

  it("renders close button when onBurgerClick is provided", () => {
    const handleBurgerClick = jest.fn();
    render(<Statistics onBurgerClick={handleBurgerClick} />);

    const closeButton = screen.getByText("Close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleBurgerClick).toHaveBeenCalledTimes(1);
  });

  it("does not render close button when onBurgerClick is not provided", () => {
    render(<Statistics />);
    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });

  it("renders ResultsComponent", () => {
    render(<Statistics />);
    const container = screen.getByTestId("results-container");
    expect(container).toBeInTheDocument();
  });
});

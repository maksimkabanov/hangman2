import { render, screen, fireEvent } from "../../test-utils";
import { LetterButton } from "../LetterButton";

describe("LetterButton", () => {
  const defaultProps = {
    letter: "a",
    success: false,
    used: false,
    disabled: false,
    isChecking: false,
  };

  it("renders with default props", () => {
    render(<LetterButton {...defaultProps} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("a");
  });

  it("applies correct styles when unused", () => {
    render(<LetterButton {...defaultProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-800", "text-white");
  });

  it("applies correct styles when used and successful", () => {
    render(<LetterButton {...defaultProps} used={true} success={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-green-500", "text-white");
  });

  it("applies correct styles when used and unsuccessful", () => {
    render(<LetterButton {...defaultProps} used={true} success={false} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500", "text-white");
  });

  it("applies correct styles when disabled", () => {
    render(<LetterButton {...defaultProps} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-300", "text-gray-500");
    expect(button).toBeDisabled();
  });

  it("shows animation when checking", () => {
    render(<LetterButton {...defaultProps} isChecking={true} />);
    const animation = screen.getByTestId("animation-pulse");
    expect(animation).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<LetterButton {...defaultProps} onClick={handleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledWith("a");
  });

  it("applies special styles for unknown letter", () => {
    render(<LetterButton {...defaultProps} letter="?" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-violet-800", "text-white");
  });
});

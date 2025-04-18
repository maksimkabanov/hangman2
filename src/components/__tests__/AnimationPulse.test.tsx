import { render, screen } from "../../test-utils";
import { AnimationPulse } from "../AnimationPulse";

describe("AnimationPulse", () => {
  it("renders with default animation duration", () => {
    render(<AnimationPulse />);
    const element = screen.getByTestId("animation-pulse");
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ animationDuration: "0.3s" });
  });

  it("renders with custom animation duration", () => {
    const customDuration = "0.5s";
    render(<AnimationPulse animationDuration={customDuration} />);
    const element = screen.getByTestId("animation-pulse");
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({ animationDuration: customDuration });
  });

  it("has correct base styles", () => {
    render(<AnimationPulse />);
    const element = screen.getByTestId("animation-pulse");
    expect(element).toHaveClass(
      "absolute",
      "inset-0",
      "z-10",
      "bg-white/70",
      "animate-pulse",
      "rounded"
    );
  });
});

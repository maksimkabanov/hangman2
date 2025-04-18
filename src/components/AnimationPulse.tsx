/**
 * A component that renders a pulsing animation overlay.
 * Used to indicate loading or processing states.
 *
 * @component
 * @example
 * ```tsx
 * <AnimationPulse />
 * <AnimationPulse animationDuration="0.5s" />
 * ```
 */
export const AnimationPulse = ({
  animationDuration = "0.3s",
}: {
  animationDuration?: string;
}) => {
  return (
    <div
      data-testid="animation-pulse"
      className="absolute inset-0 z-10 bg-white/70 animate-pulse rounded"
      style={{ animationDuration }}
    />
  );
};

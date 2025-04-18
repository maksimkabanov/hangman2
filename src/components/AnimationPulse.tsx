export const AnimationPulse = ({
  animationDuration = "0.3s",
}: {
  animationDuration?: string;
}) => {
  return (
    <div
      className="absolute inset-0 z-10 bg-white/70 animate-pulse rounded"
      style={{ animationDuration }}
    />
  );
};

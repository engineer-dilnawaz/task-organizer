type AnimatedCounterProps = {
  count: number;
  appendText?: string;
};

export const AnimatedCounter = ({
  count,
  appendText,
}: AnimatedCounterProps) => {
  return (
    <div className="flex">
      <span className="countdown font-mono text-4xl">
        <span
          style={
            {
              "--value": count,
              "--digits": 2,
            } as React.CSSProperties
          }
          aria-live="polite"
          aria-label={count.toString()}
        ></span>
      </span>
      {appendText && <span className="text-3xl">{appendText}</span>}
    </div>
  );
};

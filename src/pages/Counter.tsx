import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button
        className="btn btn-soft"
        onClick={() => setCount((prev) => prev + 1)}
      >
        +
      </button>

      <span className="countdown font-mono text-6xl">
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
      <button
        className="btn btn-soft"
        onClick={() => setCount((prev) => prev - 1)}
      >
        -
      </button>
    </div>
  );
}

export default Counter;

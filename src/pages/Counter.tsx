import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="calc-container">
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </div>
  );
}

export default Counter;

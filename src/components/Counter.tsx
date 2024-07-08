import { useState } from 'react';
import './Counter.scss'

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount((prev) => prev + 1)}>INCREMENT</button>
      <button onClick={() => setCount((prev) => prev - 1)}>DECREMENT</button>
    </div>
  );
}

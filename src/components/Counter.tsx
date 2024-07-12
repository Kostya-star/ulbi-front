import { useState } from 'react';
import cl from './Counter.module.scss';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button className={cl.button1} onClick={() => setCount((prev) => prev + 1)}>
        INCREMENT
      </button>
      <button className={cl.button2} onClick={() => setCount((prev) => prev - 1)}>
        DECREMENT
      </button>
    </div>
  ); 
}

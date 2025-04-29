import React from 'react';
import { useState, useEffect, useMemo, useCallback, useContext, createContext, useId, startTransition } from 'react';

// 1. ساخت Context برای ارسال داده به فرزندان بدون props
const CounterContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const id = useId(); // ساخت یک id یکتا

  // 2. استفاده از useEffect برای مانیتور تغییر count
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // 3. useMemo برای محاسبه سنگین
  const expensiveCalc = useMemo(() => {
    console.log('Expensive calculation...');
    return count * 2;
  }, [count]);

  // 4. useCallback برای حفظ تابع
  const handleIncrement = useCallback(() => {
    if (count > 10) {
      console.log('Count is greater than 10');
    }
    else {
      setCount(prev => prev + 1);

    }

  }, []);

  const handleDecrement = useCallback(() => {
    if (count === 5) {
      console.log('Count is 5');
    }
    else {
      setCount(prev => prev - 1);
    }
  }, []);

  // 5. تغییر input با startTransition (بهینه سازی برای عملیات‌های کند)
  const handleInputChange = (e) => {
    const value = e.target.value;
    startTransition(() => {
      setInput(value);
    });
  };

  return (
    <CounterContext.Provider value={count}>
      <div style={{ padding: 20 }}>
        <h1>React 18 Mini App 🚀</h1>

        {/* controlled component */}
        <input id={id} type="text" value={input} onChange={handleInputChange} placeholder="Type something..." />

        <p>Input: {input}</p>

        <button onClick={handleIncrement}>Increment Count</button>

        <button onClick={handleDecrement}>Decrement Count</button>
        <p>Count: {count}</p>

        {/* نمایش مقدار محاسبه شده با useMemo */}
        <p>Expensive Calculation (count * 2): {expensiveCalc}</p>

        {/* استفاده از context در فرزند */}
        <Child />
      </div>
    </CounterContext.Provider>
  );
}

function Child() {
  const count = useContext(CounterContext);
  return <h2>Count from Context: {count}</h2>;
}

export default App;

import React from 'react';
import { useState, useEffect, useMemo, useCallback, useContext, createContext, useId, startTransition } from 'react';

// 1. Création du Context pour transmettre des données aux composants enfants sans props
const CounterContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const id = useId(); // Création d'un ID unique

  // 2. Utilisation de useEffect pour surveiller les changements de count
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // 3. useMemo pour les calculs coûteux
  const expensiveCalc = useMemo(() => {
    console.log('Expensive calculation...');
    return count * 2;
  }, [count]);

  // 4. useCallback pour mémoriser la fonction
  const handleIncrement = useCallback(() => {
    if (count > 10) {
      console.log('Attention *********** Le compteur devient supérieur à 10');
    }
    else {
      setCount(prev => prev + 1);
    }
  }, []);

  const handleDecrement = useCallback(() => {
    if (count < 10) {
      console.log('Attention *********** Le compteur devient inférieur à 10');
    }
    else {
      setCount(prev => prev - 1);
    }
  }, []);

  // 5. Modification de l'input avec startTransition (optimisation pour les opérations lentes)
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

        {/* Composant contrôlé */}
        <input id={id} type="text" value={input} onChange={handleInputChange} placeholder="Type something..." />

        <p>Input: {input}</p>

        <button onClick={handleIncrement}>Increment Count</button>

        <button onClick={handleDecrement}>Decrement Count</button>
        <p>Count: {count}</p>

        {/* Affichage de la valeur calculée avec useMemo */}
        <p>Expensive Calculation (count * 2): {expensiveCalc}</p>

        {/* Utilisation du context dans le composant enfant */}
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

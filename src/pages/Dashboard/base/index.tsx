import React, { useContext } from 'react';
import { CounterContext, CounterProvider } from 'hooks/context';
import TopPanel from './components/topPanel';

const CounterDisplay: React.FC = () => {
  const { count, incrementCount } = useContext(CounterContext);
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={incrementCount}>Increment Count</button>
    </>
  );
};

const Dashboard = () => {
  console.log('w');
  return <CounterProvider>
    <TopPanel />
    <CounterDisplay />
  </CounterProvider>;
};

export default Dashboard;
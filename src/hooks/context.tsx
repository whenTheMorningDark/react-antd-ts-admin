import React, { createContext, useContext, useState } from 'react';

// 1. 创建上下文类型
type CounterContextType = {
  count: number;
  incrementCount: () => void;
};

// 2. 创建上下文对象
export const CounterContext = createContext<CounterContextType>({
  count: 0,
  incrementCount: () => undefined,
});

// 3. 创建提供者组件
export const CounterProvider = (props: React.PropsWithChildren) => {
  const [count, setCount] = useState<number>(0);

  // 定义递增函数
  const incrementCount = (): void => {
    setCount(count + 1);
  };

  // 提供上下文数据
  return (
    <CounterContext.Provider value={{ count, incrementCount }}>
      {props.children}
    </CounterContext.Provider>
  );
};


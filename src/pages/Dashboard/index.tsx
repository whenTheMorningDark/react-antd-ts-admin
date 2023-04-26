import React, { memo, useEffect, useRef, ForwardedRef, useImperativeHandle } from 'react';
import { Button } from 'antd';
import axios from 'axios';

export interface MyComponentRef {
  getData: () => string;
}
const MyComponent = React.forwardRef<MyComponentRef, { name: string }>((props, ref: ForwardedRef<MyComponentRef>) => {
  useImperativeHandle(ref, () => ({
    getData: () => props.name,
  }));

  return <div>This is my component!</div>;
});

const Dashboard = () => {
  const node = useRef<MyComponentRef | null>(null);
  const handleClick = () => {
    console.log(node.current?.getData(), 'w');
    axios.get('/api/post/list').then(res=>{
      console.log(res,'w');
    });
  };
  useEffect(() => {
    console.log(node, 'w');
  });
  return (
    <div className='z-h-100'>
      <Button onClick={handleClick}>按钮</Button>
      <MyComponent ref={node} name='张三' />
    </div>
  );
};

export default memo(Dashboard);
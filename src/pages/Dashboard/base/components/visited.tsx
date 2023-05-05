import React from 'react';
import FormatterNumber from 'components/formatterNumber';
import { Progress } from 'antd';

const Visited = (props: { total: number }) => {
  const { total } = props;
  return (
    <div className='Visited'>
      <FormatterNumber number={total} />
      <div className='card-desc'>
        <Progress percent={50} status='active' />
      </div>
    </div>
  );
};

export default Visited;
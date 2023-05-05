import React from 'react';
import FormatterNumber from 'components/formatterNumber';



const Sale = (props: { total: number }) => {
  const { total } = props;
  return (
    <div className='sale'>
      <FormatterNumber number={total} />
      <span>元</span>
      <div className='card-desc'>
        <span>日同比 12.5%</span>
        <span>周同比 5%</span>
      </div>
    </div>
  );
};

export default Sale;
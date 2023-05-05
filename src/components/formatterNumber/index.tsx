
import React from 'react';
import { thousandSep } from 'utils/utils';
import './index.less';

const FormatterNumber = (props: { number: number }) => (
  <span className='numberFormatter'>
    {thousandSep(props.number)}
  </span>
);
export default FormatterNumber;
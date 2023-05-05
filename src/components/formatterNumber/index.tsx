
import React from 'react';
import { thousandSep } from 'utils/utils';
import './index.less';
import useAnimateNumber from 'hooks/useAnimateNumber';

interface Ioptions {
  duration: number,
  decimals?: number,
  enterance?: boolean,
  direct?: boolean,
  disabled?: boolean
}

const FormatterNumber = (props: { number: number, options?: Ioptions }) => {
  const options = {
    duration: 1000,
    enterance: true,
    direct: false,
    disabled: false,
    decimals: 2, ...props.options
  };
  const [value] = useAnimateNumber(props.number, options);
  return (
    <span className='numberFormatter'>
      {thousandSep(value)}
    </span>
  );
};
export default FormatterNumber;
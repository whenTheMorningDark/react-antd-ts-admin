import React from 'react';
import ThemeSetting, { Iprops } from 'layouts/components/AppHeader/themeSetting';
import { Result } from 'antd';

type mapTypes = {
  [key: string]: React.ReactNode
}
const error = () => (
  <Result
    status='warning'
    title='There are some problems with your operation.'
  />
);
const WithDetail = (props: { type?: string }) => {
  const { type, ...reset } = props;
  const mapComponents: mapTypes = {
    themeSetting: ThemeSetting(reset as Iprops),
  };
  if (type) {
    if (type in mapComponents) {
      return mapComponents[type] as JSX.Element;
    }
  }
  return error();
};

export default WithDetail;
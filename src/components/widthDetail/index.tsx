import React from 'react';
import ThemeSetting from 'layouts/components/AppHeader/themeSetting';

type mapTypes = {
  [key: string]: React.ReactNode
}
const error = () => (
  <div>请引入该页面</div>
);
const WidthDetail = (props: { type?: string }) => {
  const { type, ...reset } = props;
  const mapComponents: mapTypes = {
    themeSetting: ThemeSetting(reset),
  };
  if (type) {
    if (type in mapComponents) {
      return mapComponents[type] as JSX.Element;
    }
  }
  return error();
};

export default WidthDetail;
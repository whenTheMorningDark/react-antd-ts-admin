import React, { memo } from 'react';
import { Button } from 'antd';
import { ReactComponent as Light403Icon } from 'assets/svg/assets-result-403.svg';
import { ReactComponent as Light404Icon } from 'assets/svg/assets-result-404.svg';
import { ReactComponent as Light500Icon } from 'assets/svg/assets-result-500.svg';
import style from './index.module.less';

// eslint-disable-next-line no-shadow
enum ECode {
  forbidden = 403,
  notFount = 404,
  error = 500,
}

interface IErrorPageProps {
  code: ECode;
  title?: string;
  desc?: string;
}

const errorInfo = {
  [ECode.forbidden]: {
    title: '403 Forbidden',
    desc: '抱歉，您无权限访问此页面',
    icon: <Light403Icon />,
  },
  [ECode.notFount]: {
    title: '404 Not Found',
    desc: '抱歉，您访问的页面不存在。',
    icon: <Light404Icon />,
  },
  [ECode.error]: {
    title: '500 Internal Server Error',
    desc: '抱歉，服务器出错啦！',
    icon: <Light500Icon />,
  },
};

const ErrorPage: React.FC<IErrorPageProps> = (props) => {
  const info = errorInfo[props.code];
  return (
    <div className={style.errorBox}>
      {info?.icon}
      <div className={style.title}>{info?.title}</div>
      <div className={style.description}>{info?.desc}</div>
      <Button type='primary'>返回首页</Button>
    </div>
  );
};

export default memo(ErrorPage);

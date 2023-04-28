import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './login.less';
import { useNavigate } from 'react-router-dom';
import { getQueryObject } from 'utils/path';

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    localStorage.setItem('token', '45454');
    const queryObj = getQueryObject();
    if (queryObj.redirect) {
      navigate(`${queryObj.redirect}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='账号' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='密码'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(Login);
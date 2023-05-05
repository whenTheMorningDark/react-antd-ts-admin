import React from 'react';
import { Row, Col } from 'antd';
import './cardFooter.less';

const CardFooter = (props: { label: string, value: string }) => (
  <Row className='cardFooter'>
    <Col span={12}>{props.label}</Col>
    <Col span={12} className={'text-right'}>{props.value}</Col>
  </Row>
);

export default CardFooter;
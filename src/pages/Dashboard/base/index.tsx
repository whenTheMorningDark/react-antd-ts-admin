import React from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ReactEcharts from 'components/reactEcharts';

const DashboardBase = () => {
  const cardList = [
    { title: '总销售额度', id: 1 },
    { title: '访问量', id: 2 },
    { title: '订单量', id: 3 },
    { title: '新增用户', id: 4 }
  ];
  const options = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ],
  };
  return (
    <div className='z-h-100'>
      <Row gutter={[16, 32]}>
        {
          cardList && cardList.length > 0 ? cardList.map(v => (
            <Col
              xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}
              key={v.title}
            >
              <Card
                title={v.title} extra={<Tooltip placement='topRight' title={v.title}>
                  <QuestionCircleOutlined />
                </Tooltip>}
              >
                <ReactEcharts options={options}></ReactEcharts>
              </Card>
            </Col>
          )) : null
        }

      </Row>
    </div>
  );
};

export default DashboardBase;
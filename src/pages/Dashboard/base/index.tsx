import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Chart } from '@antv/g2';

const DashboardBase = () => {
  console.log('w');
  const cardList = [
    { title: '总销售额度', id: 1 },
    { title: '访问量', id: 2 },
    { title: '订单量', id: 3 },
    { title: '新增用户', id: 4 }
  ];
  const chartRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
    // 循环遍历卡片列表，并在每个图表容器上添加相应的图表
    cardList.forEach(item => {
      console.log(chartRef.current[item.id], 'chartRef.current[item.id]');
      // const chartInstance = new Chart({
      //   container: chartRef.current[item.id],
      //   width: 500,
      //   height: 200,
      // });
      // chartInstance.data(yourData);
      // chartInstance.line().position(x-y).color(z);
      // chartInstance.render();
    });
  }, [cardList]);
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
                <div id='container' ref={(el) => {
                  if (el != null) chartRef.current[v.id] = el;
                }} style={{ height: '200px' }}></div>
              </Card>
            </Col>
          )) : null
        }

      </Row>
    </div>
  );
};

export default DashboardBase;
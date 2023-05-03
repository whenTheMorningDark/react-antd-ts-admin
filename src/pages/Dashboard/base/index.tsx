import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import { bind, clear } from 'lib/size-sensor';

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
      // console.log(chartRef.current[item.id], 'chartRef.current[item.id]');
      const dom = chartRef.current[item.id];
      const myChart = echarts.init(dom);
      myChart.setOption({
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
        ]
      });
      bind(dom, () => {
        console.log('123');
        myChart.resize();
      });
      // dom.addEventListener('resize', () => {
      //   console.log('123');
      // });
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
                }} style={{ height: '200px', width: '100%' }}></div>
              </Card>
            </Col>
          )) : null
        }

      </Row>
    </div>
  );
};

export default DashboardBase;
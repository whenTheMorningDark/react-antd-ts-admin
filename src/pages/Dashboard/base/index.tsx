import React from 'react';
import { Row, Col, Card, Badge, Button } from 'antd';
import ReactEcharts from 'components/reactEcharts';
import { useList } from 'hooks/useList';

const DashboardBase = () => {
  const cardList = [
    { title: '总销售额度', id: 1, badgeText: '周' },
    { title: '访问量', id: 2, badgeText: '年' },
    { title: '订单量', id: 3, badgeText: '月' },
    { title: '新增用户', id: 4, badgeText: '日' }
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
  interface Item {
    name: string,
    id: number
  }
  const listData = [
    { name: '张三', id: 1 },
    { name: '李四', id: 2 }
  ];
  const { list, push, remove, up, down } = useList<Item>(listData);

  return (
    <div className='z-h-100'>
      <Row gutter={[16, 32]}>
        {
          cardList && cardList.length > 0 ? cardList.map(v => (
            <Col
              xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}
              key={v.title}
            >
              <Badge.Ribbon text={v.badgeText} style={{ top: '16px' }}>
                <Card
                  title={v.title}
                >
                  <ReactEcharts options={options}></ReactEcharts>
                </Card>
              </Badge.Ribbon>

            </Col>
          )) : null
        }
      </Row>
      <Button type='primary' onClick={() => push({ name: `${new Date().getTime()}`, id: new Date().getTime() })}>增加</Button>
      <ul>
        {
          list.map((v, index) => (
            <li key={v.id}>
              <span>{index}</span>
              {v.name}
              <span onClick={() => remove(index)}>删除</span>
              <span onClick={() => up(index)}>上移</span>
              <span onClick={() => down(index)}>下移</span>
            </li>
          ))
        }
      </ul>


    </div>
  );
};

export default DashboardBase;
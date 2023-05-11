import React from 'react';
import { Row, Col, Card } from 'antd';
import Sale from './sale';
import Visited from './visited';
import Account from './account';
import User from './user';
import CardFooter from './cardFooter';
import './topPanel.less';

interface iCradProps {
  title: string
  id: string | number
  badgeText: string
  total: number
  type: string,
  count: string
}
interface ComponentsType<T> {
  [propName: string]: React.ElementType<T>;
}
const cardList: iCradProps[] = [
  { title: '销售额度', id: 1, badgeText: '周', total: 25848, type: 'sale', count: '560万' },
  { title: '访问量', id: 2, badgeText: '年', total: 12000, type: 'visited', count: '80万' },
  { title: '订单量', id: 3, badgeText: '月', total: 1680, type: 'account', count: '70万' },
  { title: '新增用户', id: 4, badgeText: '日', total: 128, type: 'user', count: '1200人' }
];

const components: ComponentsType<iCradProps> = {
  sale: Sale,
  visited: Visited,
  account: Account,
  user: User
};

const TopPanel = () => (
  <Row gutter={[16, 16]}>
    {cardList.map((v) => {
      const key = v.type;
      const Component = components[key] ? components[key] : null;
      if (Component) {
        return (
          <Col
            xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}
            key={v.title}
          >
            <Card title={v.title} headStyle={{ color: ' rgb(81, 90, 110)' }} bodyStyle={{ padding: '10px' }}>
              <Component {...v} />
              <CardFooter label={`总${v.title}`} value={v.count} />
            </Card>
          </Col>
        );
      }
      return null;
    })}
  </Row>
);

export default React.memo(TopPanel);

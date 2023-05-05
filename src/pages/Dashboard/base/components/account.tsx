import React from 'react';
import FormatterNumber from 'components/formatterNumber';
import ReactEcharts from 'components/reactEcharts';
import * as echarts from 'echarts';

const Account = (props: { total: number }) => {
  const { total } = props;
  const option: echarts.EChartOption<echarts.EChartOption.SeriesLine> = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '1px',
      right: '2px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          show: false, // 隐藏X轴线
        },
        axisTick: {
          show: false, // 隐藏X轴刻度
        },
        axisLabel: {
          show: false, // 隐藏X轴标签
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: false, // 隐藏X轴线
        },
        axisTick: {
          show: false, // 隐藏X轴刻度
        },
        axisLabel: {
          show: false, // 隐藏X轴标签
        },
      }
    ],
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
    ]
  };
  return (
    <div className='account'>
      <FormatterNumber number={total} />
      <div className='card-desc'>
        <ReactEcharts options={option} style={{ height: '42px' }} />
      </div>
    </div>
  );
};
export default Account;

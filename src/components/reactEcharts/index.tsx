import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import ResizeDom from 'components/resizeDom';

interface iReactEchartsProps {
  options: echarts.EChartOption<echarts.EChartOption.SeriesLine | echarts.EChartOption.SeriesBar>
}

const ReactEcharts = (props: iReactEchartsProps) => {
  console.log('www');
  const { options } = props;
  const echartDom = useRef<HTMLDivElement | null>(null);
  let myChart: echarts.ECharts;
  useEffect(() => {
    if (!echartDom.current) {
      return;
    }
    myChart = echarts.init(echartDom.current);
    myChart.setOption(options);
  }, [echartDom]);

  const onResize = () => {
    if (myChart) {
      myChart.resize();
    }
  };
  return (
    <ResizeDom onResize={onResize}>
      <div ref={echartDom} style={{ width: '100%', height: '200px' }}></div>
    </ResizeDom>
  );
};

export default ReactEcharts;
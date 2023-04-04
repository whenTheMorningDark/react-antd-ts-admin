import React from 'react';
import { NodesProps } from './package/Graph';
import RectNode from './package/node/RectNode';

interface Iprops{
  nodeData:NodesProps[]
}

function FlowChart(props:Iprops) {
  console.log('FlowChart');
  const { nodeData } = props;
  console.log(nodeData, 'nodeData');
  return (
    <div className='flowChart' style={{ width: '100%', height: '100%' }}>
      {
        nodeData.map((v) => (
          <RectNode {...v} key={v.id} />
        ))
      }
    </div>
  );
}

export default FlowChart;

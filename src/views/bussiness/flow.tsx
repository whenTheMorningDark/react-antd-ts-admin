import React, { useState } from 'react';
import FlowChart from 'src/components/FlowChart';

function Flow() {
  console.log('flow');
  const [nodes, setNodes] = useState([
    {
      id: '3',
      type: 'rect',
      x: 200,
      y: 200,
      text: '1zzzz',
      config: {},
    },
    {
      id: '4',
      type: 'rect',
      x: 400,
      y: 300,
      text: '1zzzz',
    },
  ]);
  return (
    <FlowChart
      nodeData={nodes}
    />
  );
}
export default Flow;

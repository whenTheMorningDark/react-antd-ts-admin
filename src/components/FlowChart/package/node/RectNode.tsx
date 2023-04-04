import React from 'react';
// import classNames from 'classnames';
import { NodesProps } from '../Graph';

import '../theme/node.less';

function RectNode(props:NodesProps) {
  console.log('RectNode');
  // const reactClass = classNames('rectNode');
  const styleNodeClass = {
    width: props.width || 150,
    height: props.height || 80,
    border: '1px solid red',
    left: props.x,
    top: props.y,
  };
  console.log(styleNodeClass, 'styleNodeClass');
  return (
    <div className='rectNode' style={styleNodeClass}>
      rectNode
    </div>
  );
}

export default RectNode;

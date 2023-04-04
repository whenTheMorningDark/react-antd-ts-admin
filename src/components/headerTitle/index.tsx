import React from 'react';
import './index.less';

function HeaderTitle() {
  console.log('HeaderTitle');
  return (
    <div className='header-title'>
      <div className='title-line' />
      <span className='title-text'>热门推荐</span>
    </div>
  );
}

export default React.memo(HeaderTitle);

import React from 'react';
import { Button } from 'antd';
import Style from './WrapperList.module.less';
import snakeImg from '../images/snake.jpg';

function WrapperList() {
  console.log('WrapperList', Style);
  return (
    <div className={Style.wrapperList}>
      <div className='list-row'>
        <div className='list-row-item'>
          <div className='img'>
            <img src={snakeImg} alt='' width='72px' height='72px' />
          </div>
          <div className='list-row-item-right'>
            <div className='list-row-item-title'>贪吃蛇多人大对决贪吃蛇多人大对决贪吃蛇多人大对决</div>
            <div className='list-row-item-desc'>
              这一款非常经典好玩的贪吃蛇游戏。采用Q萌可爱的卡通画风，
              在这里玩家可以体验全新的界面以及全新的贪吃蛇游戏玩法，更多生动趣味的蛇蛇造型，更多的模式关卡。随时随地都可以玩，
              非常适合打发时
            </div>
            <div className='list-row-item-bottom'>
              <Button type='primary'>开始游戏</Button>
            </div>
          </div>
        </div>

        <div className='list-row-item'>
          <div className='img'>
            <img src={snakeImg} alt='' width='72px' height='72px' />
          </div>
          <div className='list-row-item-right'>
            <div className='list-row-item-title'>贪吃蛇多人大对决贪吃蛇多人大对决贪吃蛇多人大对决</div>
            <div className='list-row-item-desc'>
              这一款非常经典好玩的贪吃蛇游戏。采用Q萌可爱的卡通画风，
              在这里玩家可以体验全新的界面以及全新的贪吃蛇游戏玩法，更多生动趣味的蛇蛇造型，更多的模式关卡。随时随地都可以玩，
              非常适合打发时
            </div>
            <div className='list-row-item-bottom'>
              <Button type='primary'>开始游戏</Button>
            </div>
          </div>
        </div>

        <div className='list-row-item'>
          <div className='img'>
            <img src={snakeImg} alt='' width='72px' height='72px' />
          </div>
          <div className='list-row-item-right'>
            <div className='list-row-item-title'>贪吃蛇多人大对决贪吃蛇多人大对决贪吃蛇多人大对决</div>
            <div className='list-row-item-desc'>
              这一款非常经典好玩的贪吃蛇游戏。采用Q萌可爱的卡通画风，
              在这里玩家可以体验全新的界面以及全新的贪吃蛇游戏玩法，更多生动趣味的蛇蛇造型，更多的模式关卡。随时随地都可以玩，
              非常适合打发时
            </div>
            <div className='list-row-item-bottom'>
              <Button type='primary'>开始游戏</Button>
            </div>
          </div>
        </div>

        <div className='list-row-item'>
          <div className='img'>
            <img src={snakeImg} alt='' width='72px' height='72px' />
          </div>
          <div className='list-row-item-right'>
            <div className='list-row-item-title'>贪吃蛇多人大对决贪吃蛇多人大对决贪吃蛇多人大对决</div>
            <div className='list-row-item-desc'>
              这一款非常经典好玩的贪吃蛇游戏。采用Q萌可爱的卡通画风，
              在这里玩家可以体验全新的界面以及全新的贪吃蛇游戏玩法，更多生动趣味的蛇蛇造型，更多的模式关卡。随时随地都可以玩，
              非常适合打发时
            </div>
            <div className='list-row-item-bottom'>
              <Button type='primary'>开始游戏</Button>
            </div>
          </div>
        </div>

        <div className='list-row-item'>
          <div className='img'>
            <img src={snakeImg} alt='' width='72px' height='72px' />
          </div>
          <div className='list-row-item-right'>
            <div className='list-row-item-title'>贪吃蛇多人大对决贪吃蛇多人大对决贪吃蛇多人大对决</div>
            <div className='list-row-item-desc'>
              这一款非常经典好玩的贪吃蛇游戏。采用Q萌可爱的卡通画风，
              在这里玩家可以体验全新的界面以及全新的贪吃蛇游戏玩法，更多生动趣味的蛇蛇造型，更多的模式关卡。随时随地都可以玩，
              非常适合打发时
            </div>
            <div className='list-row-item-bottom'>
              <Button type='primary'>开始游戏</Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default WrapperList;

import React, { useEffect, useRef } from 'react';
import { KaCanvas } from './kaCanvas';

function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) throw new Error('divRef is not assigned');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const kaCanvas = new KaCanvas({
      el: canvasRef.current,
      cols: [
        { title: '品牌', key: 'brandName', width: 80 },
        { title: '商品名称', key: 'goodsName', width: 150 },
      ],
      data: [
        { brandName: '唯品会', goodsName: '商城' },
        { brandName: '唯品会', goodsName: '商城' },
        { brandName: '唯品会', goodsName: '商城' },
        { brandName: '唯品会', goodsName: '商城' },
        { brandName: '唯品会', goodsName: '商城' },
        { brandName: '唯品会', goodsName: '商城' },
        { brandName: '唯品会', goodsName: '商城' },
      ],
    });
  }, []);
  return (
    <div className='dashboard' style={{ padding: 20 }}>
      <canvas id='bigCanvas' ref={canvasRef} />
    </div>
  );
}

export default Dashboard;

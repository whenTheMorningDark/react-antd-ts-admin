import React, { useRef, useEffect } from 'react';
import { bind } from 'lib/size-sensor';

interface iResizeDomProps {
  onResize: (ref: React.RefObject<HTMLElement>) => void;
}

const ResizeDom = (props: React.PropsWithChildren<iResizeDomProps>) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const { children, onResize } = props;

  useEffect(() => {
    if (!domRef.current) return;
    const unbind = bind(domRef.current, () => {
      if (onResize) {
        onResize(domRef);
      }
    });
    // eslint-disable-next-line consistent-return
    return () => {
      unbind();
    };
  }, [domRef, onResize]);

  return (
    <div className='resizeDom' ref={domRef}>
      {children}
    </div>
  );
};

export default ResizeDom;
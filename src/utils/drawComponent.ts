import ListDetail from 'src/views/musicList/listDetail';
import React from 'react';

type drawComponentMapType = Record<string, any>

const drawComponentMap:drawComponentMapType = {
  ListDetail,
};
const getComponentMap = (children:string) => {
  if (!children) {
    return null;
  }
  return 123;
};

export {
  drawComponentMap,
  getComponentMap,
};

const data: memuProps[] = [
  {
    id: '1',
    title: '应用管理',
    pId: '0',
    path: '/application',
  },
  {
    id: '2',
    title: '应用管理-1',
    pId: '1',
    path: '/application/2',
  },
];

type memuProps = {
  id: string;
  pId: string;
  title: string;
  path: string;
  children?: any[];
};
type InfoProps = Record<string, memuProps>;

function arrayToMenu(list:memuProps[]) {
  const info = list.reduce((map:InfoProps, node) => {
    if (!map[node.id]) {
      map[node.id] = node;
      node.children = [];
    }
    return map;
  }, {});
  return list.filter((v) => {
    if (info[v.pId] && info[v.pId].children) {
      info[v.pId].children?.push(v);
    }
    return v.pId === '0';
  });
}

export {};

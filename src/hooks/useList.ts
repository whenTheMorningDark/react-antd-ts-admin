import { useCallback, useState } from 'react';

const useList = <T>(initialList: T[] = []) => {

  const [list, setList] = useState(initialList);

  const push = useCallback((item: T) => {
    setList((l) => l.concat([item]));
  }, []);

  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);
      return temp;
    });
  }, []);

  const up = useCallback((index: number) => {
    const targetIndex = index - 1;
    setList((l) => {
      const temp = [...l];
      if (targetIndex > -1) {
        const target = temp.filter((_, sIndex) => sIndex !== index);
        target.splice(targetIndex, 0, temp[index]);
        return target;
      }
      return temp;
    });
  }, []);
  const down = useCallback((index: number) => {
    const targetIndex = index + 1;
    setList((l) => {
      const temp = [...l];
      if (targetIndex <= temp.length - 1) {
        const target = temp.filter((_, sIndex) => sIndex !== index);
        target.splice(targetIndex, 0, temp[index]);
        return target;
      }
      return temp;
    });
  }, []);

  return {
    list,
    push,
    remove,
    up,
    down
  };
};

export {
  useList
};
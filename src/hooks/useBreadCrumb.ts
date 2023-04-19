
import { usePath } from 'hooks/usePath';
import { useMemo } from 'react';

const useBreadCrumb = () => {
  const { pathKeys } = usePath();
  const bradCrumbList = useMemo(() => pathKeys.map(v => {
    v.url = v.key;
    v.title = v.label;
    return v;
  }), [pathKeys]);
  return bradCrumbList;
};
export {
  useBreadCrumb
};

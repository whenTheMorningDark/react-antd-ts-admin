import { useMemo, useState } from 'react';
import { useMemoizedFn } from './useMemoizedFn';

function useSelections<T>(items: T[], defaultSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const isSelected = (item: T) => selectedSet.has(item);
  const allSelected = useMemo(() => items.every((o) => selectedSet.has(o)), [items, selectedSet]);
  const unSelectAll = () => {
    for (const v of items) {
      selectedSet.delete(v);
    }
    setSelected([...selectedSet]);
  };

  const selectAll = () => {
    for (const o of items) {
      selectedSet.add(o);
    }
    setSelected([...selectedSet]);
  };
  const toggleAll = () => {
    if (allSelected) {
      unSelectAll();
    } else {
      selectAll();
    }
  };

  const partiallySelected = useMemo(() => !allSelected, [allSelected]);
  const select = (item: T) => {
    selectedSet.add(item);
    return setSelected([...selectedSet]);
  };

  const unSelect = (item: T) => {
    selectedSet.delete(item);
    return setSelected([...selectedSet]);
  };
  const toggle = (item: T) => {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };
  return {
    selected,
    allSelected,
    toggleAll: useMemoizedFn(toggleAll),
    partiallySelected,
    isSelected,
    toggle: useMemoizedFn(toggle),
  };
}
export { useSelections };

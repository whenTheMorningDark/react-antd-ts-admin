/* eslint-disable operator-linebreak */
/**
 * @description 解决canvas画布不清晰的情况
 * @param context any
 * @returns
 */
const getPixelRatio = (context: any) => {
  if (!context) {
    return 1;
  }
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};
// eslint-disable-next-line max-len
const getComputedStyleByProps = (el: any, props: string) => +getComputedStyle(el).getPropertyValue(props).slice(0, -2);

export { getPixelRatio, getComputedStyleByProps };

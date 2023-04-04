export function tranNumber(num:number, point:0) {
  if (num === undefined || num === null) {
    return 0;
  }
  // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
  const numStr = num.toString().split('.')[0];
  if (numStr.length < 5) { // 判断数字有多长,如果小于6,,表示10万以内的数字,让其直接显示
    return numStr;
  } if (numStr.length >= 5 && numStr.length <= 8) { // 如果数字大于6位,小于8位,让其数字后面加单位万
    // eslint-disable-next-line unicorn/prefer-string-slice
    const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
    // 由千位,百位组成的一个数字
    return `${Number.parseFloat(`${Number.parseInt(`${num / 10_000}`, 10)}.${decimal}`)}万`;
  } if (numStr.length > 8) { // 如果数字大于8位,让其数字后面加单位亿
    // eslint-disable-next-line unicorn/prefer-string-slice
    const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
    return `${Number.parseFloat(`${Number.parseInt(`${num / 100_000_000}`, 10)}.${decimal}`)}亿`;
  }
  return 0;
}

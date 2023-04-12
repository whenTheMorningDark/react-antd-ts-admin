import tinycolor from 'tinycolor2';

interface HSV {
  h: number;
  s: number;
  v: number;
}
const hueStep = 2;
const isTop = true;
const topSaturationStep = 0.16;
const behindSaturationStep = 0.05;
const topColorCount = 5;
export const topBrightnessLightStep = 0.05; // 亮度阶梯，主色前(浅色部分)
export const behindBrightnessStep = 0.15; // 亮度阶梯，主色后(深色部分)
export const behindColorCount = 4; // 主色后数量，深色部分
const getHue = (hsv: HSV, i: number) => {
  let hue: number;

  // H: [60, 240]为暖色调，其他为冷色调
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    // 主色为冷色调
    // 1-10色相变化 => 色相从小到大 => 色相逆时针旋转 => 更冷
    hue = isTop ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    // 主色为暖色调
    // 1-10色相变化 => 色相从大到小 => 色相顺时针旋转 => 更暖
    hue = isTop ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if ((hue < 0 || hue >= 360)) {
    hue = Math.abs(Math.abs(hue) - 360);
  }
  return hue;
};

const getSaturation = (hsv: HSV, i: number) => {
  // 不改变灰色的饱和度
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  let saturation: number = isTop ? hsv.s - topSaturationStep * i : hsv.s + behindSaturationStep * i;
  if (saturation > 1) {
    saturation = 1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }

  // 主色前1个饱和度限制在 0.06-0.1 之间
  if (isTop && i === topColorCount && saturation > 0.1) {
    saturation = 0.1;
  }

  return Number(saturation.toFixed(2));
};
export const getValue = (hsv: HSV, i: number): number => {
  let value: number;

  value = isTop ? hsv.v + topBrightnessLightStep * i : hsv.v - behindBrightnessStep * i;
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
};

const getGenerateColor = (primaryColor: string) => {
  const colors: any = [];
  const hsv: HSV = tinycolor(primaryColor).toHsv();
  colors.push(primaryColor);
  for (let j = topColorCount; j > 0; j -= 1) {
    const color = tinycolor({
      h: getHue(hsv, j),
      s: getSaturation(hsv, j),
      v: getValue(hsv, j),
    }).toHexString();

    colors.push(color);
  }
  // 主色后
  for (let i = 1; i <= behindColorCount; i += 1) {
    const color = tinycolor({
      h: getHue(hsv, i),
      s: getSaturation(hsv, i),
      v: getValue(hsv, i),
    }).toHexString();

    colors.push(color);
  }
  console.log(colors, 'colors');

  return colors;
};

export { getGenerateColor };

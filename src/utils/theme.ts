
export const themeConfig: Record<string, Record<string, string>> = {
  'light': {
    '--ka-brand-color': '#fff',
    '--ka-brand-color-text1': 'rgba(0, 0, 0, 0.44)',
    '--ka-brand-color-text2': 'rgba(0, 0, 0, 0.88)',
    '--ka-brand-color-text3': '#e8e8e8',
    '--ka-brand-container': '#f5f5f5',
    '--ka-brand-card': '#fff'
  },
  'dark': {
    '--ka-brand-color': '#001529',
    '--ka-brand-color-text1': 'rgba(255, 255, 255, 0.5)',
    '--ka-brand-color-text2': '#fff',
    '--ka-brand-color-text3': '#4b4b4b',
    '--ka-brand-container': '#181818',
    '--ka-brand-card': '#000c17'
  }
};
const getColorMapKey = (colorMap: Record<string, string>) =>
  Object.keys(colorMap).reduce((cur, next) => {
    cur += `${next}:${colorMap[next]};`;
    return cur;
  }, '');


export function insertThemeStylesheet(theme: string, colorMap: Record<string, string>, mode: 'light' | 'dark') {
  if (!colorMap || Object.keys(colorMap).length === 0) {
    colorMap = themeConfig[mode];
  }
  const root = `:root[theme-mode=${mode}]`;
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `${root}{${getColorMapKey(colorMap)}}`;
  document.head.appendChild(styleSheet);
}
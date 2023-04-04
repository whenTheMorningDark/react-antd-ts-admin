/* eslint-disable class-methods-use-this */
interface colProps {
  title: string;
  key: string;
  width: number;
}
interface KaCanvasProps {
  el: HTMLCanvasElement;
  cols: colProps[];
  data: any[];
}

class CalcCanvas {
  options: KaCanvasProps;

  originPoint: {
    x: number;
    y: number;
  };

  maxPoint: {
    x: number;
    y: number;
    scrollerWidth: number;
    fillWidth: number;
  };

  fillWidth: number;

  bodyWidth: number;

  scrollerWidth: number;

  displayColumns: any[];

  displayRows: any[];

  bodyHeight: number;

  constructor(options: KaCanvasProps) {
    this.options = options;
    this.scrollerWidth = 20;
    this.displayColumns = [];
    this.displayRows = [];
    this.originPoint = {
      x: 100,
      y: 30,
    };
    this.maxPoint = {
      x: 0,
      y: 0,
      scrollerWidth: this.scrollerWidth,
      fillWidth: 0,
    };
    this.fillWidth = 0;
    this.bodyWidth = 0;
    this.bodyHeight = 0;
  }

  init() {
    const { cols, el, data } = this.options;
    this.setMaxPoint(el);

    const displayColumns = this.getDisplayColumns(cols);
    const displayRows = this.getDisplayRows(data);
    this.setBodyHeight(displayRows);
    return {
      displayColumns,
      displayRows,
      maxPoint: this.maxPoint,
      bodyWidth: this.bodyWidth,
      bodyHeight: this.bodyHeight,
    };
  }

  setBodyHeight(allRows: any[]) {
    this.bodyHeight = this.originPoint.y;
    for (const row of allRows) {
      this.bodyHeight += row.height;
    }
  }

  setMaxPoint(el: HTMLCanvasElement) {
    if (el) {
      const width = el.offsetWidth - 2;
      const height = el.offsetHeight - 2;
      let columnCount = 0;
      for (const column of this.options.cols) {
        this.bodyWidth += column.width ?? 100;
        columnCount += 1;
      }
      if (this.bodyWidth < width - this.scrollerWidth) {
        this.fillWidth = (width - this.bodyWidth - this.scrollerWidth) / columnCount;
        this.bodyWidth = width - this.scrollerWidth;
      }
      this.maxPoint = {
        x: width,
        y: height,
        fillWidth: this.fillWidth,
        scrollerWidth: this.scrollerWidth,
      };
    }
  }

  getDisplayRows(allRows: any) {
    let temp: any = [];
    let startY = this.originPoint.y;
    for (const row of allRows) {
      if (startY + 30 > this.originPoint.y && startY < this.maxPoint.y) {
        const rowClone = { ...row, y: startY, height: 30 };
        temp.push(rowClone);
      } else if (startY >= this.maxPoint.y) {
        break;
      }
      startY += 30;
    }
    temp = [...temp];
    return temp;
  }

  getDisplayColumns(cols: colProps[]) {
    const res: any = [];
    let startX = this.originPoint.x;
    for (const column of cols) {
      const width = column.width + this.fillWidth;
      if (width + startX > this.originPoint.x && startX < this.maxPoint.x) {
        const columnClone = { ...column, x: startX, width };
        res.push(columnClone);
      }
      startX += width;
    }
    return res;
  }
}

export { CalcCanvas };

/* eslint-disable class-methods-use-this */
import { getPixelRatio, getComputedStyleByProps } from './utils';
import { displayCells } from './data';
import { CalcCanvas } from './calcCanvas';

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

class KaCanvas {
  ctx: CanvasRenderingContext2D | null;

  el: HTMLCanvasElement;

  data: any[];

  cols: colProps[];

  maxPoint: {
    x: number;
    y: number;
  };

  displayColumns: any[];

  displayRows: any[];

  bodyWidth: number;

  bodyHeight: number;

  constructor(options: KaCanvasProps) {
    console.log(options, 'options');
    this.ctx = null;
    this.maxPoint = { x: 0, y: 0 };
    const { el, data, cols } = options;
    this.el = el;
    this.data = data;
    this.cols = cols;
    this.initStyle();
    const calcCanvas = new CalcCanvas(options);
    const { displayColumns, displayRows, maxPoint, bodyWidth, bodyHeight } = calcCanvas.init();
    this.maxPoint = maxPoint;
    this.displayColumns = displayColumns;
    this.displayRows = displayRows;
    this.bodyWidth = bodyWidth;
    this.bodyHeight = bodyHeight;
    this.initCanvas();
  }

  initStyle() {
    this.el.style.height = '700px';
    this.el.style.width = '100%';
    this.el.style.background = '#fff';
    const ratio = getPixelRatio(this.ctx);
    const width = getComputedStyleByProps(this.el, 'width');
    const height = getComputedStyleByProps(this.el, 'height');
    this.el.width = width * ratio;
    this.el.height = height * ratio;
    this.el.style.width = `${width}px`;
    this.el.style.height = `${height}px`;

    if (this.ctx) {
      this.ctx.fillStyle = '#333333'; // text color
      this.ctx.textAlign = 'center';
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#d4d4d4';
      this.ctx.textBaseline = 'middle';
      this.ctx.save();
    }
  }

  initCanvas() {
    this.ctx = (this.el as HTMLCanvasElement).getContext('2d');
    if (this.ctx) {
      // 初始化样式
      // this.initStyle();
      this.paintLine();
      // this.paintBody();
      // this.paintHeader();
      // this.paintSerial();
      // this.paintNo();
    }
  }

  p(value: any) {
    const temp = `${value}`;
    if (temp && !temp.includes('.')) {
      return value + 0.5;
    }
    return value;
  }

  i(value: number) {
    return Math.round(value);
  }

  paintSerial() {
    if (!this.ctx) {
      return;
    }

    this.ctx.lineWidth = 1;
    for (const item of this.displayRows) {
      if (15 + item.y > -item.height) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#d4d4d4';
        this.ctx.fillStyle = '#666666';
        const serialWidth = 70;
        this.ctx.fillText(`${item.rowIndex + 1}`, serialWidth / 2, 15 + item.y);
        this.ctx.moveTo(this.p(0), this.p(item.y + item.height));
        this.ctx.lineTo(this.p(serialWidth), this.p(item.y + item.height));
        this.ctx.stroke();
      }
    }
    this.ctx.stroke();
  }

  paintNo() {
    if (!this.ctx) {
      return;
    }
    const rowHeight = 30;
    const serialWidth = 70;
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#d4d4d4';
    this.ctx.fillStyle = '#f9f9f9';
    this.ctx.fillRect(0, 0, serialWidth, rowHeight);
    this.ctx.fillStyle = '#333333';
    this.ctx.fillText('序号', serialWidth / 2, 15);
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(this.p(serialWidth), this.p(0));
    this.ctx.lineTo(this.p(serialWidth), this.p(rowHeight));
    this.ctx.lineTo(this.p(0), this.p(rowHeight));
    this.ctx.stroke();
  }

  paintHeader() {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = 'f9f9f9';
    const width = 1664;
    const rowHeight = 0;
    this.ctx.fillRect(0, 0, width, rowHeight);
    const fillWidth = 0;
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#d4d4d4';
    this.ctx.font = 'bold 12px PingFang SC';
    this.ctx.lineWidth = 1;
    for (const column of this.displayColumns) {
      if (!column.fixed || fillWidth > 0) {
        const textColor = '#333333';
        this.ctx.fillStyle = textColor;
        this.ctx.fillText(column.title, this.p(column.x + column.width / 2), this.p(15));
        this.ctx.moveTo(this.p(column.x + column.width), this.p(0));
        this.ctx.lineTo(this.p(column.x + column.width), this.p(rowHeight));
      }
    }
    this.ctx.stroke();
  }

  paintBody() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.font = 'normal 12px PingFang SC';
      this.ctx.fillStyle = '#666666';
      const fillWidth = 0;
      for (const rows of displayCells) {
        for (const item of rows) {
          if ((!item.fixed || fillWidth > 0) && item.paintText && item.paintText.length > 0) {
            // eslint-disable-next-line max-len
            this.paintText(this.ctx, this.i(item.x + item.width / 2), this.i(15 + item.y), item.paintText);
          }
        }
      }
      this.ctx.stroke();
    }
  }

  paintText(ctx: any, x: any, y: any, row: any) {
    for (const [b, element] of row.entries()) {
      ctx.fillText(element, x, y + b * 18);
    }
  }

  paintLine() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#d4d4d4';
      this.ctx.lineWidth = 1;
      const maxPoint = {
        x: this.maxPoint.x,
        y: this.maxPoint.y,
      };
      const serialWidth = 70;
      const rowHeight = 30;
      for (const column of this.displayColumns) {
        this.ctx.moveTo(this.p(column.x + column.width) + 0.25, this.i(0));
        this.ctx.lineTo(this.p(column.x + column.width), this.i(this.bodyHeight));
      }
      for (const item of this.displayRows) {
        this.ctx.moveTo(this.i(0), this.p(item.y + item.height));
        this.ctx.lineTo(this.i(maxPoint.x), this.p(item.y + item.height));
      }
      this.ctx.moveTo(this.p(serialWidth), this.p(rowHeight));
      this.ctx.lineTo(this.p(serialWidth), this.i(this.bodyHeight));
      this.ctx.moveTo(this.i(0), this.p(rowHeight));
      this.ctx.lineTo(this.i(maxPoint.x), this.p(rowHeight));

      this.ctx.stroke();
    }
  }
}

export { KaCanvas };

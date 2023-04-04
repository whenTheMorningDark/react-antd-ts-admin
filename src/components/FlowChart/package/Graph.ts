/* eslint-disable class-methods-use-this */
export interface NodesProps {
  id:string | number,
  type:string,
  x:number,
  y:number,
  text?:string,
  width?:number,
  height?:number
}

class Graph {
  constructor(opions:NodesProps) {
    this.initNode(opions);
  }

  initNode(opions:NodesProps) {
    if (opions.type === 'rect') {
      // this.in
    }
  }
}

export {};

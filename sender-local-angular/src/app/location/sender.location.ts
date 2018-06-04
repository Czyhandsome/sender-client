/**
 * 快递员位置
 */
export class SenderLocation {

  constructor(public longitude: number, public latitude: number) {
  }

  toString(): string {
    return `(${this.longitude}, ${this.latitude})`;
  }
}

// ********** 常用的地址 ********** //
// 创客云谷
const marketValley = new SenderLocation(117.310954, 31.831635);
// 野生动物园
const wildZoo = new SenderLocation(117.17448, 31.840853);
// 三孝口
const sanxiaokou = new SenderLocation(117.282285, 31.865395);

export const senderLocations: Array<SenderLocation> = [
  marketValley, wildZoo, sanxiaokou
];

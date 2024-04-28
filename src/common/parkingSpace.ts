/*
 * @Author       : Senkita
 * @Date         : 2024-04-26 10:36:45
 * @Description  : 车位类
 * @LastEditTime : 2024-04-29 00:15:52
 * @LastEditors  : Senkita
 */
import drawParkingLot from "~/src/common/drawParkingLot";
import type { Point } from "~/src/globals";
import { BLOCK_SIZE, parkingLotArr } from "~/src/globals";

class ParkingSpace {
  private spaceNum: string;
  private coordX: number;
  private coordY: number;
  private direction: string;
  private _placed: boolean;
  private ctx: CanvasRenderingContext2D;
  private _head: Point | undefined;

  constructor(
    ctx: CanvasRenderingContext2D,
    spaceNum: string,
    coordX: number,
    coordY: number,
    direction: string = "default",
    placed: boolean = true
  ) {
    this.spaceNum = spaceNum;
    this.coordX = coordX;
    this.coordY = coordY;
    this.direction = direction;
    this._placed = placed;
    this.ctx = ctx;

    this._calHead(parkingLotArr);
  }

  get head() {
    return this._head;
  }

  set placed(val: boolean) {
    if (val) this._placed = true;
    else this._placed = false;

    switch (this._placed) {
      case false:
        parkingLotArr[(this._head![1] - 3) / 4][(this._head![0] - 3) / 4] = 0;
        break;
      default:
        parkingLotArr[(this._head![1] - 3) / 4][(this._head![0] - 3) / 4] = 1;
    }
    drawParkingLot(this.ctx);
    this.draw();
  }

  private _calHead = (parkingLotArr: number[][]) => {
    switch (this.direction) {
      case "Left":
        // TODO
        break;
      case "Right":
        // TODO
        break;
      case "Reverse":
        this._head = [this.coordX - 2, this.coordY - 6];
        break;
      default:
        this._head = [this.coordX + 2, this.coordY + 6];

        switch (this._placed) {
          case false:
            parkingLotArr[(this._head![1] - 3) / 4][
              (this._head![0] - 3) / 4
            ] = 0;
            break;
          default:
            parkingLotArr[(this._head![1] - 3) / 4][
              (this._head![0] - 3) / 4
            ] = 1;
        }
    }
  };

  /**
   * @description  : 绘制车位
   * @param         {*} void
   * @return        {*}
   */
  draw = () => {
    let x: number, y: number;
    let color: string = "green"; // 车位颜色
    let rotationAngle: number = 0; // 旋转角度

    if (this._placed) color = "red";

    switch (this.direction) {
      // 左朝向
      case "Left":
        x = -this.coordX * BLOCK_SIZE;
        y = this.coordY * BLOCK_SIZE;
        rotationAngle = -90;
        break;
      // 逆向
      case "Reverse":
        x = -this.coordX * BLOCK_SIZE;
        y = -this.coordY * BLOCK_SIZE;
        rotationAngle = 180;
        break;
      // 右朝向
      case "Right":
        x = this.coordX * BLOCK_SIZE;
        y = -this.coordY * BLOCK_SIZE;
        rotationAngle = 90;
        break;
      // 正向
      default:
        x = this.coordX * BLOCK_SIZE;
        y = this.coordY * BLOCK_SIZE;
        rotationAngle = 0;
        break;
    }

    this.ctx.fillStyle = color; // 设置车位颜色
    this.ctx.rotate((rotationAngle * Math.PI) / 180); // 旋转

    this.ctx.fillRect(x, y, BLOCK_SIZE * 4, BLOCK_SIZE * 8);

    this.drawSpaceBorder(x, y);
    this.drawSpaceNum(x + BLOCK_SIZE * 0.8, y + BLOCK_SIZE * 6, color);

    this.ctx.rotate(-(rotationAngle * Math.PI) / 180); // 旋转回去
  };

  /**
   * @description  : 绘制车位边框
   * @param         {number} x
   * @param         {number} y
   * @return        {*}
   */
  drawSpaceBorder = (x: number, y: number): void => {
    this.ctx.lineWidth = 4; // 设置线宽
    this.ctx.strokeStyle = "white"; // 白色车位边框位收费车位

    this.ctx.beginPath();
    this.ctx.moveTo(x, y); // 左上角
    this.ctx.lineTo(x + BLOCK_SIZE * 4, y); // 右上角
    this.ctx.lineTo(x + BLOCK_SIZE * 4, y + BLOCK_SIZE * 8); // 右下角
    this.ctx.lineTo(x, y + BLOCK_SIZE * 8); // 左下角
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.lineWidth = 1; // 重置线宽
  };

  /**
   * @description  : 绘制车位号
   * @param         {number} x
   * @param         {number} y
   * @param         {string} rawColor
   * @return        {*}
   */
  drawSpaceNum = (x: number, y: number, rawColor: string): void => {
    this.ctx.fillStyle = "white";
    this.ctx.font = "15px Arial";
    this.ctx.fillText(`车位${this.spaceNum}`, x, y);
    this.ctx.fillStyle = rawColor;
  };
}

export default ParkingSpace;

/*
 * @Author       : Senkita
 * @Date         : 2024-04-28 16:37:08
 * @Description  : 框线停车场
 * @LastEditTime : 2024-04-28 16:44:21
 * @LastEditors  : Senkita
 */
import ParkingSpace from "~/src/common/parkingSpace";
import {
  BLOCK_SIZE,
  PARKING_LOT_HEIGHT,
  PARKING_LOT_WIDTH,
  SPACES,
} from "~/src/globals";

/**
 * @description  : 框限停车场
 * @param         {CanvasRenderingContext2D} ctx
 * @return        {*}
 */
const drawParkingLot = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, PARKING_LOT_WIDTH, PARKING_LOT_HEIGHT);

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, PARKING_LOT_WIDTH, BLOCK_SIZE); // 顶边
  ctx.fillRect(0, 0, BLOCK_SIZE, PARKING_LOT_HEIGHT); // 左边
  ctx.fillRect(
    0,
    PARKING_LOT_HEIGHT - BLOCK_SIZE,
    PARKING_LOT_WIDTH,
    BLOCK_SIZE
  ); // 底边
  ctx.fillRect(
    PARKING_LOT_WIDTH - BLOCK_SIZE,
    0,
    BLOCK_SIZE,
    PARKING_LOT_HEIGHT
  ); // 右边

  // 绘制车位
  SPACES.forEach((space) => {
    const { spaceNum, coordX, coordY, direction, placed } = space;
    const spaceObj = new ParkingSpace(
      ctx,
      spaceNum,
      coordX,
      coordY,
      direction,
      placed
    );

    spaceObj.draw();
  });
};

export default drawParkingLot;

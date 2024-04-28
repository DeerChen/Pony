import { BLOCK_SIZE, type Point } from "~/src/globals";

const drawPathLine = (ctx: CanvasRenderingContext2D, posArr: Point[]) => {
  ctx.strokeStyle = "blue";

  ctx.beginPath();
  ctx.moveTo((posArr[0][1] * 4 + 3) * BLOCK_SIZE, 21 * BLOCK_SIZE);
  posArr.forEach((pos) => {
    ctx.lineTo((pos[1] * 4 + 3) * BLOCK_SIZE, (pos[0] * 4 + 3) * BLOCK_SIZE);
  });

  ctx.stroke();
};

export default drawPathLine;

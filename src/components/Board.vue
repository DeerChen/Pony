<!--
 * @Author       : Senkita
 * @Date         : 2024-04-28 16:18:18
 * @Description  : 画板
 * @LastEditTime : 2024-04-28 23:51:36
 * @LastEditors  : Senkita
-->
<template>
  <div id="board">
    <canvas ref="canvas"></canvas>
    <div id="btn" @click="wayToSpace($refs.canvas.getContext('2d')!)">
      导航至车位
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ParkingSpace,
  drawParkingLot,
  drawPathLine,
  findWay,
} from "~/src/common";
import {
  PARKING_LOT_HEIGHT,
  PARKING_LOT_WIDTH,
  ROADS,
  parkingLotArr,
} from "~/src/globals";
import { useStateParked } from "~/src/states";

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = PARKING_LOT_WIDTH;
    canvas.value.height = PARKING_LOT_HEIGHT;

    const ctx = canvas.value.getContext("2d")!;

    drawParkingLot(ctx);

    const space01 = new ParkingSpace(ctx, "01", 1, 1, "default", false);
    space01.draw();

    const stateParked = useStateParked();

    watch(
      stateParked,
      (value) => {
        switch (value) {
          case 1:
            space01.placed = true;
            break;
          default:
            space01.placed = false;
        }
      },
      { immediate: true }
    );
  }
});

// 导航至车位
const wayToSpace = (ctx: CanvasRenderingContext2D) => {
  ROADS.forEach((road) => {
    parkingLotArr[road.y][road.x] = 2;
  });

  const posArr = findWay(parkingLotArr, [4, 4]);

  if (posArr.length > 0) {
    drawPathLine(ctx, posArr);
  }
};
</script>

<style scoped>
#board {
  margin: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#btn {
  margin: 10px;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #333;
  color: white;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
}
</style>
